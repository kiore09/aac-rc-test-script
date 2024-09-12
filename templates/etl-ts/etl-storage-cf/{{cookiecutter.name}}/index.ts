/**
 ===========================================================================
 This sample code is created by the Architecture as Code team at TELUS.
 The main purpose of this code is to give developers at TELUS a reference
 and starting point for their projects.
 As a TELUS Developer, you may update your copy of this code per your needs.
 ===========================================================================
 Last updated: 26-07-2024
 Description: This function:
 - Retrieves the triggering CSV file from the source bucket
 - Converts the contents to JSON using a helper class
 - Saves the JSON file to the target bucket (specified by environment
 variable, refer to cloudbuild.yaml)
 - Deletes the triggering CSV file from the source bucket.
 ===========================================================================
 */
 import { Storage } from "@google-cloud/storage";
 import csvToJson from "csvtojson";
 import logger from "./utils/sample.logger";
 import fs from "fs";
 import path from "path";
 import dotenv from "dotenv";
 
 dotenv.config();
 
 /**
  * Generic background Cloud Function to be triggered by Cloud Storage.
  * @param {object} file The Cloud Storage file metadata.
  * @param {object} context The event metadata.
  */
 export const TransformHandlerNode = async (file: any, context: any) => {
   try {
     // Creates a client
     const storage = new Storage();
 
     // Validate the file type
     if (path.parse(file.name).ext !== ".csv") {
       logger.error("The uploaded file is invalid! Please upload a csv file.");
     } else {
       // Retrieve the file
       const sourceBucket = file.bucket;
       const csvFile = await storage
         .bucket(sourceBucket)
         .file(file.name)
         .download();
       logger.info(`Retrieving ${file.name} from bucket - ${sourceBucket}`);
 
       // Convert file to Json
       const jsonObj = await csvToJson().fromString(csvFile.toString());
       const jsonFileContents = JSON.stringify(jsonObj);
       logger.info(`Converted ${file.name} to Json`);
 
       // Write file
       const formatFileName = file.name.replace('.csv', '.json');
       const targetBucket = process.env.TARGET_BUCKET as string;
       await storage.bucket(targetBucket).file(formatFileName).save(jsonFileContents);
 
       // Delete file from source bucket
       await storage.bucket(sourceBucket).file(file.name).delete();
       logger.info(`Deleting ${file.name} from bucket - ${sourceBucket}`);
     }
   } catch (error) {
     logger.error(`An error occurred: ${error instanceof Error ? error.stack : JSON.stringify(error)}`);
   }
 };
 
