/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 10-01-2022
Description: This sample controller demonstrates the use of the Google
Cloud Storage client library to read blobs from a bucket, create new blobs,
and save those new blobs to a bucket.

The application uses Thymeleaf as an HTML templating engine. The templates
can be found under the src/views directory.
===========================================================================
*/

const config = require('../../../config');

const bucketName = config.bucketName; // GCP bucket name

const getStorageIndex = async (request, reply) => {
    try {
        request.server.log.info('Sample Node App Accessing GCS: ' + bucketName);
        const files = await request.server.getStorageFiles(bucketName);
        reply.view('storage.ejs', { storageBucketName: bucketName, files: files });
      } catch (err) {
        request.server.log.error(`An Error Occurred: ${err}`);
        reply.view('storage.ejs', { error: err });
      }
      return reply;
  }

const uploadBucket = async (request, reply) => {
    try {
        const {blobName} = request.body;
        await request.server.uploadStorageFile(bucketName, blobName);
        request.server.log.info('Blob uploaded successfully!')
        reply.redirect('/gcstorage');
      } catch (err) {
        request.server.log.error(`An Error Occurred: ${err}`);
        reply.view('storage.ejs', { error: err });
      }
      return reply;
}

  
module.exports = {getStorageIndex, uploadBucket};