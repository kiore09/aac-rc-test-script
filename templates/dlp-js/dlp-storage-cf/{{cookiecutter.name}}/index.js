/**
 ===========================================================================
 This sample code is created by the Architecture as Code team at TELUS.
 The main purpose of this code is to give developers at TELUS a reference
 and starting point for their projects.
 As a TELUS Developer, you may update your copy of this code per your needs.
 ===========================================================================
 Last updated: 11-24-2022
 Description: This function:
 - Retrieves the triggering text file from the source bucket
 - Creates a DLP job to inspect the file and classify it as sensitive or non-sensitive.
 - If the the file contains sensitive data, de-identification process would run to mask the sensitive data. 
 - Based on the result of the DLP inspection, moves the file to corresponding bucket.
 ===========================================================================
 */
const {Storage} = require('@google-cloud/storage');
const logger = require('./utils/sample.logger');
const DLP = require('@google-cloud/dlp').v2;   
const path = require('node:path');
const fs = require('fs');
const tmp = require('tmp');

require('dotenv').config()


/**
 * Generic background Cloud Function to be triggered by Cloud Storage.
 * @param {object} file The Cloud Storage file metadata.
 * @param {object} context The event metadata.
 */
 exports.createDLPInspectandDeidNode = async (file, context) => {
  try{

    logger.info(`=========== Function started by: ${file.name} from bucket: ${file.bucket}`);

    // Creates a client
    const storage = new Storage();
    const dlp = new DLP.DlpServiceClient();
    const projectId = process.env.GCP_PROJECT || process.env.GCLOUD_PROJECT

    // Validate the file type
    if(path.parse(file.name).ext !== '.txt'){
      logger.error('The uploaded file is invalid! Please upload a txt file.');
    }
    else{   
      const fileContent = await storage.bucket(file.bucket).file(file.name).download();
      const fileItem = {value: fileContent};

      logger.info(`Processing ${file.name} from bucket - ${file.bucket}`);

      // create a DLP Job
      // The minimum likelihood required before returning a match
      // For a list of possible values see: 
      // https://cloud.google.com/dlp/docs/reference/rest/v2/InspectConfig#likelihood
      const minLikelihood = 'LIKELIHOOD_UNSPECIFIED';

      // The maximum number of findings to report (0 = server maximum)
      // For more detail about Finding Limit see:
      // https://cloud.google.com/dlp/docs/reference/rest/v2/InspectConfig#findinglimits
      const maxFindings = 0;

      // The infoTypes of information to match
      // For a detail list of InfoTypes see:
      // https://cloud.google.com/dlp/docs/infotypes-reference
      const infoTypes = [{name: 'PERSON_NAME'}, {name: 'EMAIL_ADDRESS'}, {name: 'US_STATE'}];


      // Whether to include the matching string
      // When true, a contextual quote from the data that triggered a finding is included in the response
      const includeQuote = true;

      // Construct request for creating an inspect job
      const request = {
        parent: `projects/${projectId}/locations/global`,
        inspectJob: {
          inspectConfig: {
            infoTypes: infoTypes,
            minLikelihood: minLikelihood,    
            includeQuote: includeQuote,        
            limits: {
              maxFindingsPerRequest: maxFindings,
            },
          },          
        },
        item: fileItem
      };

      logger.info('Submitting DLP inspection request...: ' + JSON.stringify(request));
      const [response] = await dlp.inspectContent(request);
      logger.info('DLP inspection request done!');
      
      const findings = response.result.findings;
      if (findings.length > 0) {
        logger.info('Findings:');
        findings.forEach(finding => {
          if (includeQuote) {
            logger.info(`\tQuote: ${finding.quote}`);
          }
          logger.info(`\tInfo type: ${finding.infoType.name}`);
          logger.info(`\tLikelihood: ${finding.likelihood}`);
        });

        // Start de-identification process
        logger.info(`Start de-identification process for ${file.name} from bucket ${file.bucket}`);

        // Define masking character
        // For more details of Masking, see: 
        // https://cloud.google.com/dlp/docs/transformations-reference#dlp-deidentify-masking-nodejs
        const maskingCharacter = '*';

        // Construct the request for processing de-identification
        const deid_request = {
          parent: `projects/${projectId}/locations/global`,
          inspectConfig: {
            infoTypes: infoTypes
          },
          deidentifyConfig: {
            infoTypeTransformations: {
              transformations: [
                {
                  infoTypes: infoTypes,
                  primitiveTransformation: {
                    characterMaskConfig: {
                      maskingCharacter: maskingCharacter,
                    },
                  },
                },
              ],
            },
        },
        item: fileItem,
        }

        // Run deidentification request
        logger.info('Submitting deidentification request...: ' + JSON.stringify(deid_request));
        const [deid_response] = await dlp.deidentifyContent(deid_request);
        const deidentifiedItem = deid_response.item;
        logger.info(deidentifiedItem.value);

        // Create new blob with masked data
        logger.info(`Moving file to sensitive bucket...`);
        const options = {"name": `${file.name}`};
        const fileToUpload = tmp.tmpNameSync(options);
        fs.writeFileSync(fileToUpload, deidentifiedItem.value);
        const file = fileToUpload;
        await storage.bucket(`${process.env.SENSITIVE_BUCKET}`).upload(fileToUpload);
        logger.info(`Done.`);

        // Delete the unmasked source file in the source bucket
        await storage.bucket(file.bucket).file(file.name).delete();
        logger.info(`Clear up the source bucket. `);

      } else {
        logger.info('No findings.');
        // Move the file to the non_sensitive bucket
        const dstFile = `gs://${process.env.NON_SENSITIVE_BUCKET}/${file.name}`;
        await storage
          .bucket(file.bucket)
          .file(file.name)
          .move(dstFile);
        
        logger.info(`Moved file to non_sensitive bucket`);
      }
    }    
  }catch (error) {
    logger.error(`An error occurred: ${error.message}`);
  }
}
