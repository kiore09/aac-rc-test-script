/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 27-12-2022
Description: This sample application demonstrates access to a firestore
collection on GCP.
===========================================================================
*/

const FirestoreClient = require('../services/FirestoreClient.service');
const logger = require('../utils/sample.logger');
const config = require('../../config');

const firestoreCollection = config.firestoreCollection;

const getDocuments = async (req, res) => {
  const collectionDocuments = await FirestoreClient.getDocuments();

  const docs = collectionDocuments.map((docObj) => ({
      id: docObj.id,
      data: JSON.stringify(docObj.data())
    }));

  try {
    res.render('getDocuments', {
      firestoreCollection: firestoreCollection,
      collectionDocuments: docs,
    });
  } catch (err) {
    // Log the error on the server without exposing detailed information to the client
    console.error('An error occurred while processing the request:', err.message);
    res.render('getDocuments', {
      error: 'An error occurred while processing your request. Please try again later.',
    });
  }
};

module.exports = {getDocuments};
