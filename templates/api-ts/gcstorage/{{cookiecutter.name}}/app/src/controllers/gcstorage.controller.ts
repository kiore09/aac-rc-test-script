/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 19-07-2024
Description: This sample controller demonstrates the use of the Google
Cloud Storage client library to read blobs from a bucket, and create
"Hello World!" .txt files in the bucket
===========================================================================
*/

import { Request, Response } from 'express';
import { GetFilesResponse, Storage } from '@google-cloud/storage';
import logger from '../utils/sample.logger';
import config from '../config';

// TODO: Remove
//const {Storage} = require('@google-cloud/storage');
//const fs = require('fs');
//const logger = require('../utils/sample.logger');
//const config = require('../../config');
//const tmp = require('tmp');

const bucketName: string = config.bucketName; // GCP bucket name
const storage: Storage = new Storage({projectId: config.projectId}); // Initialize cloud storage
let error: string = ''; // Return error message

/**
 * TODO: Remove
 * Server endpoint that fetches the blobs in the bucket whenever a client hits
 * GET / (e.g. localhost:8080)
 * @param req Express request object
 * @param res Express request object
 *

const storageBucket = (req: Request, res: Response): Promise<void> => {
  res.render('index');
};*/

/**
 * Server endpoint that returns a form view whenever a client hits
 * GET / (e.g. localhost:8080/storage)
 * @param req Express request object
 * @param res Express request object
 */

const blobUploadView = async (req: Request, res: Response): Promise<void> => {
  try {
    logger.info('Sample Node App Accessing GCS: ' + bucketName);
    const [ files ]: GetFilesResponse = await storage.bucket(bucketName).getFiles();
    const fileNames: string[] = files.map((file) => file.name);
    res.render('storage', {
      bucketName,
      fileNames,
    });
  } catch (err) {
    logger.error('error', err);
    error = err.message;
    res.render('storage', {
      message: 'Failed to retrieve files!',
      error,
    });
  }
};

/**
 * Server endpoint that uploads a test blob whenever a client hits
 * POST /upload (e.g. localhost:8080/upload)
 * @param req Express request object
 * @param res Express request object
*/

const uploadBlob = async (req: Request, res: Response): Promise<void> => {
  logger.info(`Input body: ${JSON.stringify(req.body)}`);
  const { blobName } = req.body;
  const formatFileName = `${blobName.replace(' ', '_')}.txt`;
  try {
    /*const options = {"name": formatFileName};
    const fileToUpload = tmp.tmpNameSync(options);
    const newFile= `${fileToUpload}.txt`
    fs.writeFileSync(newFile, 'Hello World!');
    const file = fileToUpload;
    await storage.bucket(bucketName).upload(file);*/
    await storage.bucket(bucketName).file(formatFileName).save('Hello World!');
    logger.info('Blob uploaded successfully!');
    res.redirect('/storage');
  } catch (err) {
    error = err.message;
    res.render('storage', {
      message: 'Failed to upload Blob!',
      error,
    });
    logger.error(`Failed to upload Blob: ${err}`);
  }
};

export { blobUploadView, uploadBlob };