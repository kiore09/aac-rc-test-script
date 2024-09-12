package com.samples.telus;
/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 29-05-2024
Description: Entry point class of the Cloud Function, as specified in
cloudbuild.yaml. This function:
- Retrieves the triggering CSV file from the source bucket
- Converts the contents to JSON using a helper class
- Saves the JSON file to the target bucket (specified by environment
  variable, refer to cloudbuild.yaml)
- Deletes the triggering CSV file from the source bucket.
===========================================================================
*/

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.util.logging.Level;
import java.util.logging.Logger;

import com.google.cloud.functions.BackgroundFunction;
import com.google.cloud.functions.Context;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Bucket;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;

import com.samples.telus.eventpojos.GcsEvent;

public class ETLFunction implements BackgroundFunction<GcsEvent> {
  private static final Logger logger = Logger.getLogger(ETLFunction.class.getName());

  /**
   * Triggered when a new file is created/updated in Cloud Storage. Information
   * about the triggering file is stored in the input GcsEvent (i.e. "event"
   * variable).
   */
  @Override
  public void accept(GcsEvent event, Context context) {
    // Ignore files without .csv extension
    if (!event.getName().endsWith(".csv")) {
        logger.warning("Skipping " + event.getName() + " - Not a CSV file");
        return;
    }

    // Get a reference to the Cloud Storage service
    Storage storage = StorageOptions.newBuilder().build().getService();

    // Get CSV file content from the source bucket
    String srcBucketName = event.getBucket();
    logger.info("Retrieving " + event.getName() + " from bucket " + srcBucketName);
    Bucket srcBucket = storage.get(srcBucketName);
    Blob csvBlob = srcBucket.get(event.getName());  // This blob contains the CSV file's contents

    try (InputStream inStream = new ByteArrayInputStream(csvBlob.getContent());
        ByteArrayOutputStream outStream = new ByteArrayOutputStream()) {

        // Convert the CSV file contents to JSON, then send to the output array stream
        logger.info("Converting " + event.getName() + " to JSON");
        CsvToJsonConverter converter = new CsvToJsonConverter();
        converter.convertToJson(inStream, outStream);

        // Retrieve destination bucket name from a Cloud Function environment variable
        String dstBucketName = System.getenv("TARGET_BUCKET");
        Bucket dstBucket = storage.get(dstBucketName);

        // Create a destination blob for the JSON file and write the output content to it
        String newFileName = event.getName().replace(".csv", ".json");
        logger.info("Saving " + newFileName + " to bucket " + dstBucketName);
        BlobId jsonBlobId = BlobId.of(dstBucket.getName(), newFileName);
        BlobInfo jsonBlobInfo = BlobInfo.newBuilder(jsonBlobId).setContentType("text/plain").build();
        storage.create(jsonBlobInfo, outStream.toByteArray());   // Store json file to destination bucket

        // Delete source file from source bucket
        logger.info("Deleting " + event.getName() + " from bucket " + srcBucketName);
        csvBlob.delete();

    } catch (Throwable e) {
        logger.log(Level.SEVERE, "Exception caught", e);
    }
  }
}
