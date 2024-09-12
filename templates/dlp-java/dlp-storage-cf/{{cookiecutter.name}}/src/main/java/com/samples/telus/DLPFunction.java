package com.samples.telus;

import com.google.cloud.functions.BackgroundFunction;
import com.google.cloud.functions.Context;
import com.google.cloud.dlp.v2.DlpServiceClient;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Bucket;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import com.google.privacy.dlp.v2.ByteContentItem;
import com.google.privacy.dlp.v2.ContentItem;
import com.google.privacy.dlp.v2.DeidentifyConfig;
import com.google.privacy.dlp.v2.DeidentifyContentRequest;
import com.google.privacy.dlp.v2.DeidentifyContentResponse;
import com.google.privacy.dlp.v2.Finding;
import com.google.privacy.dlp.v2.InfoType;
import com.google.privacy.dlp.v2.InfoTypeTransformations;
import com.google.privacy.dlp.v2.InfoTypeTransformations.InfoTypeTransformation;
import com.google.privacy.dlp.v2.InspectConfig;
import com.google.privacy.dlp.v2.InspectContentRequest;
import com.google.privacy.dlp.v2.InspectResult;
import com.google.privacy.dlp.v2.Likelihood;
import com.google.privacy.dlp.v2.LocationName;
import com.google.privacy.dlp.v2.PrimitiveTransformation;
import com.google.privacy.dlp.v2.ReplaceValueConfig;
import com.google.privacy.dlp.v2.Value;
import com.google.protobuf.ByteString;

import java.util.List;
import java.util.logging.Logger;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class DLPFunction implements BackgroundFunction<GcsEvent> {
    private static final Logger logger = Logger.getLogger(DLPFunction.class.getName());

    @Override
    public void accept(GcsEvent event, Context context) {
        try {
            // Read environment variables
            String projectId = System.getenv("GCP_PROJECT");
            String sensBucketName = System.getenv("SENS_BUCKET");
            String nonSensBucketName = System.getenv("NON_SENS_BUCKET");

            // Parse incoming JSON message from Cloud Storage
            String fileName = event.getName();
            String srcBucketName = event.getBucket();
            logger.info("New file \"" + fileName + "\" in bucket \"" + srcBucketName + "\"");

            // Check that the input file extension is "txt"
            if (!fileName.endsWith("txt")) {
                throw new IllegalArgumentException("File \"" + fileName + "\" is not a \"txt\" file");
            }

            // Retrieve file from bucket, wrap contents into ContentItem
            Storage storage = StorageOptions.newBuilder().build().getService();
            Bucket srcBucket = storage.get(srcBucketName);
            Blob txtBlob = srcBucket.get(fileName);
            ByteContentItem byteContentItem = ByteContentItem.newBuilder()
                .setType(ByteContentItem.BytesType.TEXT_UTF8)
                .setData(ByteString.copyFrom(txtBlob.getContent()))
                .build();
            ContentItem contentItem = ContentItem.newBuilder().setByteItem(byteContentItem).build();

            // Initialize client for requests to the DLP service - can be reused for multiple requests
            try (DlpServiceClient dlpServiceClient = DlpServiceClient.create()) {

                // Create and send an inspection request to the DLP service and cache the results
                InspectConfig inspectConfig = generateInspectConfig();
                InspectContentRequest inspectRequest = InspectContentRequest.newBuilder()
                    .setParent(LocationName.of(projectId, "global").toString())
                    .setInspectConfig(inspectConfig)
                    .setItem(contentItem)
                    .build();
                InspectResult inspectResult = dlpServiceClient.inspectContent(inspectRequest).getResult();

                if (inspectResult.getFindingsCount() <= 0) {
                    // No findings, move file to non-sensitive bucket - process complete
                    logger.info("No findings for file \"" + fileName + "\", moving to non-sensitive bucket");
                    txtBlob.copyTo(nonSensBucketName).getResult();
                    txtBlob.delete();
                    logger.info("Moved file \"" + fileName + "\" to non-sensitive bucket");

                } else {
                    // Report findings
                    for (Finding finding : inspectResult.getFindingsList()) {
                        logger.info("Value: \"" + finding.getQuote() +
                            "\", Info type: " + finding.getInfoType().getName() +
                            ", Likelihood: " + finding.getLikelihood());
                    }

                    // Create and send de-identification request
                    DeidentifyContentRequest deIDRequest = generateDeidentifyContentRequest(projectId, contentItem, inspectConfig);
                    DeidentifyContentResponse deIDResponse = dlpServiceClient.deidentifyContent(deIDRequest);

                    // Save de-identified file content in sensitive bucket, delete original file from source bucket
                    BlobInfo newBlobInfo = BlobInfo.newBuilder(BlobId.of(sensBucketName, fileName)).build();
                    storage.create(newBlobInfo,
                        deIDResponse.getItem().getByteItem().getData().toStringUtf8().getBytes());
                    txtBlob.delete();
                    logger.info("Created de-identified file \"" + fileName + "\" in sensitive bucket, deleted source file");
                }
            }

        } catch (Throwable e) {
            logger.severe(e.getMessage());
        }
    }

    /**
     * Returns a configuration object for an inspection request. The inspection will try to match
     * email addresses, US states, and names of people
     */
    private InspectConfig generateInspectConfig() {
        // The types of information to match
        // For more details, visit: https://cloud.google.com/dlp/docs/infotypes-reference
        List<InfoType> infoTypes = Stream.of("PERSON_NAME", "EMAIL_ADDRESS", "US_STATE")
            .map(it -> InfoType.newBuilder().setName(it).build())
            .collect(Collectors.toList());

        // The minimum likelihood required before returning a match
        // For more details, visit: https://cloud.google.com/dlp/docs/likelihood
        Likelihood minLikelihood = Likelihood.LIKELIHOOD_UNSPECIFIED;

        // The maximum number of findings to report (0 = server maximum)
        // For more details, visit: https://cloud.google.com/dlp/docs/reference/rest/v2/InspectConfig#findinglimits
        InspectConfig.FindingLimits findingLimits = InspectConfig.FindingLimits.newBuilder().setMaxFindingsPerItem(0).build();

        // Assemble inspection configuration
        return InspectConfig.newBuilder()
            .addAllInfoTypes(infoTypes)
            .setMinLikelihood(minLikelihood)
            .setLimits(findingLimits)
            .setIncludeQuote(true)
            .build();
    }

    /**
     * Returns a request object for de-identification, replacing matched values with asterisks
     * 
     * @param projectId ID of the GCP project
     * @param contentItem Content that needs to be de-identified
     * @param inspectConfig Inspection configuration object
     * @return A request object for de-identification
     */
    private DeidentifyContentRequest generateDeidentifyContentRequest(
        String projectId, ContentItem contentItem, InspectConfig inspectConfig) {

        // Replace findings with asterisks
        // For more details, visit: https://cloud.google.com/dlp/docs/transformations-reference#replacement
        ReplaceValueConfig replaceConfig = ReplaceValueConfig.newBuilder()
            .setNewValue(Value.newBuilder().setStringValue("******").build())
            .build();

        // Rule for transforming a value
        // For more details, visit: https://cloud.google.com/dlp/docs/reference/rest/v2/projects.deidentifyTemplates#primitivetransformation
        PrimitiveTransformation primitiveTransformation = PrimitiveTransformation.newBuilder()
            .setReplaceConfig(replaceConfig)
            .build();
        
        // A transformation to apply to text that is identified as a specific infoType
        // For more details, visit: https://cloud.google.com/dlp/docs/reference/rest/v2/projects.deidentifyTemplates#infotypetransformation
        InfoTypeTransformation infoTypeTransformation = InfoTypeTransformation.newBuilder()
            .setPrimitiveTransformation(primitiveTransformation)
            .addAllInfoTypes(inspectConfig.getInfoTypesList())
            .build();

        // Assemble de-identification configuration
        DeidentifyConfig deIDConfig = DeidentifyConfig.newBuilder()
            .setInfoTypeTransformations(
                InfoTypeTransformations.newBuilder().addTransformations(infoTypeTransformation))
            .build();
        
        // Build the de-identification request
        return DeidentifyContentRequest.newBuilder()
            .setParent(LocationName.of(projectId, "global").toString())
            .setItem(contentItem)
            .setDeidentifyConfig(deIDConfig)
            .setInspectConfig(inspectConfig)
            .build();
    }
}
