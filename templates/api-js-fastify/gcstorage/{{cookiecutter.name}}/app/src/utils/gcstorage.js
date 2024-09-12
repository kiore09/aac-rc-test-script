'use-strict'

/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 10-01-2022
Description: This function get the storage file from a bucket
===========================================================================
*/

const config = require('../../config');
const {Storage} = require('@google-cloud/storage');
const fs = require('fs');
const tmp = require('tmp');

const storage = new Storage({projectId: config.projectId}); // Initialize cloud storage

/**
 * Get storage files from gc storage
 * @param bucketName
 */
const getStorageFiles = async (bucketName) => {
  if (!bucketName) {
    throw new TypeError('bucketName is required!');
  }
  if (typeof bucketName !== 'string') {
    throw new TypeError('bucketName must be a string!');
  }
  const files = await storage.bucket(bucketName).getFiles();
  return files;
};

/**
 * Upload storage file
 * @param bucketName
 * @param blobName
 */
const uploadStorageFile = async (bucketName, blobName) => {
  if (!bucketName) {
    throw new TypeError('bucketName is required!');
  }
  if (typeof bucketName !== 'string') {
    throw new TypeError('bucketName must be a string!');
  }
  if (!blobName) {
    throw new TypeError('blobName is required!');
  }
  if (typeof blobName !== 'string') {
    throw new TypeError('blobName must be a string!');
  }
  const formatFileName = blobName.replace(' ', '_');
  const options = {"name": formatFileName};
  const fileToUpload = tmp.tmpNameSync(options);
  fs.writeFileSync(fileToUpload, 'Hello World!');
  const file = fileToUpload;
  await storage.bucket(bucketName).upload(file);
};

module.exports = {getStorageFiles, uploadStorageFile};
