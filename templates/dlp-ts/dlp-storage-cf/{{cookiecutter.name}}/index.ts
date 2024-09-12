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
 import { Storage } from '@google-cloud/storage';
 import logger from './utils/sample.logger';
 import { DlpServiceClient } from '@google-cloud/dlp';
 import path from 'node:path';
 import fs from 'fs';
 import tmp from 'tmp';
 import dotenv from 'dotenv';
 
 dotenv.config();
 
 /**
  * Generic background Cloud Function to be triggered by Cloud Storage.
  * @param {object} file The Cloud Storage file metadata.
  * @param {object} context The event metadata.
  */
 export const createDLPInspectandDeidNode = async (file: any, context: any) => {
   try {
     logger.info(`=========== Function started by: ${file.name} from bucket: ${file.bucket}`);
 
     const storage = new Storage();
     const dlp = new DlpServiceClient();
     const projectId = process.env.GCP_PROJECT || process.env.GCLOUD_PROJECT;
 
     if (path.parse(file.name).ext !== '.txt') {
       logger.error('The uploaded file is invalid! Please upload a txt file.');
     } else {
       const [fileContent] = await storage.bucket(file.bucket).file(file.name).download();
       const fileItem = { value: fileContent.toString() };
 
       logger.info(`Processing ${file.name} from bucket - ${file.bucket}`);
 
       const minLikelihood = 'LIKELIHOOD_UNSPECIFIED';
       const maxFindings = 0;
       const infoTypes = [{ name: 'PERSON_NAME' }, { name: 'EMAIL_ADDRESS' }, { name: 'US_STATE' }];
       const includeQuote = true;
 
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
 
       const findings = response.result?.findings ?? [];
       if (findings.length > 0) {
         logger.info('Findings:');
         findings.forEach((finding) => {
           if (includeQuote && finding.quote) {
             logger.info(`\tQuote: ${finding.quote}`);
           }
           if (finding.infoType) {
             logger.info(`\tInfo type: ${finding.infoType.name}`);
           }
           logger.info(`\tLikelihood: ${finding.likelihood}`);
         });
 
         logger.info(`Start de-identification process for ${file.name} from bucket ${file.bucket}`);
         const maskingCharacter = '*';
 
         const deidRequest = {
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
         };
 
         logger.info('Submitting deidentification request...: ' + JSON.stringify(deidRequest));
         const [deidResponse] = await dlp.deidentifyContent(deidRequest);
         const deidentifiedItem = deidResponse.item?.value;
 
         if (deidentifiedItem) {
           logger.info(deidentifiedItem);
 
           logger.info(`Moving file to sensitive bucket...`);
           const options = { "name": `${file.name}` };
           const fileToUpload = tmp.tmpNameSync(options);
           fs.writeFileSync(fileToUpload, deidentifiedItem);
           await storage.bucket(`${process.env.SENSITIVE_BUCKET}`).upload(fileToUpload);
           logger.info(`Done.`);
 
           await storage.bucket(file.bucket).file(file.name).delete();
           logger.info(`Clear up the source bucket.`);
         }
       } else {
         logger.info('No findings.');
         const dstFile = `gs://${process.env.NON_SENSITIVE_BUCKET}/${file.name}`;
         await storage
           .bucket(file.bucket)
           .file(file.name)
           .move(dstFile);
         logger.info(`Moved file to non_sensitive bucket`);
       }
     }
   } catch (error: any) {
    logger.error(`An error occurred: ${error instanceof Error ? error.stack : JSON.stringify(error)}`);
   }
 }
 