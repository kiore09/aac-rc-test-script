/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 27-12-2022
Description: This sample controller demonstrates the use of the Google
Cloud Storage client library to read blobs from a bucket, create new blobs,
and save those new blobs to a bucket.

The application uses Thymeleaf as an HTML templating engine. The templates
can be found under the src/views directory.
===========================================================================
*/

const {Storage} = require('@google-cloud/storage');
const fs = require('fs');
const logger = require('../utils/sample.logger');
const config = require('../../config');
const tmp = require('tmp');

const bucketName = config.bucketName; // GCP bucket name
const projectId = config.projectId; // GCP project id
const storage = new Storage({projectId: config.projectId}); // Initialize cloud storage
let error = ''; // Return error message

/**
 * Server endpoint that fetches the blobs in the bucket whenever a client hits
 * GET / (e.g. localhost:8080)
 * @param req Express request object
 * @param res Express request object
 */

const storageBucket = (req, res) => {
  res.render('index');
};

/**
 * Server endpoint that returns a form view whenever a client hits
 * GET / (e.g. localhost:8080/storage)
 * @param req Express request object
 * @param res Express request object
 */

const blobUploadView = async (req, res) => {
  try {
    const files = await storage.bucket(bucketName).getFiles();
    logger.info('Sample Node App Accessing GCS: ' + bucketName);
    res.render('storage', {
      projectid: projectId,
      storageBucketName: bucketName,
      files: files,
    });
  } catch (err) {
    logger.error('error', err);
    error = err.message;
    res.render('storage', {
      message: 'Failed to retrieve files!',
      error: error,
    });
  }
};

/**
 * Server endpoint that uploads a test blob whenever a client hits
 * POST /upload (e.g. localhost:8080/upload)
 * @param req Express request object
 * @param res Express request object
*/

const uploadBlob = async (req, res) => {
  const {blobName} = req.body;
  const formatFileName = blobName.replace(' ', '_') + '.txt'; // Ensure it has the .txt extension
  try {
    // Generate a temporary file name
    const fileToUpload = tmp.tmpNameSync();
    const newFile = `${fileToUpload}.txt`;

    // Write to the temporary file
    fs.writeFileSync(newFile, 'Hello World!');

    // Upload the file to the bucket with the specified name
    await storage.bucket(bucketName).upload(newFile, {destination: formatFileName});
    logger.info('Blob uploaded successfully!');

    // Delete the temporary file after uploading
    fs.unlinkSync(newFile);

    res.redirect('/storage');
  } catch (err) {
    error = err.message;
    res.render('storage', {
      message: 'Failed to upload Blob!',
      error: error,
    });
    logger.error(`Failed to upload Blob: ${err}`);
  }
};

module.exports = {storageBucket, blobUploadView, uploadBlob};
