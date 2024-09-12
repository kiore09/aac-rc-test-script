/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 25-08-2023
Description: This sample controller route defines routes for interacting with Google Cloud Storage operations

* Implement rate limiting to prevent abuse and ensure fair API usage.
* This restricts client requests within a time window, protecting your server from overload.
* Consider using a rate limiting middleware or library for easy implementation.
* Resources to start:
* - Understanding Rate Limiting in Node.js: https://javascript.plainenglish.io/rate-limiting-apis-in-node-js-what-is-it-and-how-does-it-work-f19b4aff3f38
* - How to Implement Rate Limiting in Node.js: https://www.section.io/engineering-education/nodejs-rate-limiting/
* Enhance security and stability, ensuring a smoother experience for users.
===========================================================================
 */

const express = require('express');
const router = express.Router();
const gcstorageController = require('../controllers/gcstorage.controller');

router
    .get('/', gcstorageController.storageBucket)
    .get('/storage', gcstorageController.blobUploadView)
    .post('/upload', gcstorageController.uploadBlob);

module.exports = router;
