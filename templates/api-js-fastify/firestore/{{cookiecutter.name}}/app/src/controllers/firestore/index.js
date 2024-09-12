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

const FirestoreClient = require('../../utils/getDocuments');
const config = require('../../../config');

const firestoreCollection = config.firestoreCollection;

const getDocuments = async (request, reply) => {
  const collectionDocuments = await FirestoreClient.getDocuments();

  const docs = collectionDocuments.map((docObj) => ({
      id: docObj.id,
      data: JSON.stringify(docObj.data())
    }));

  try {
    reply.view('getDocuments.ejs', {
      firestoreCollection: firestoreCollection,
      collectionDocuments: docs,
    });
  } catch (err) {
    reply.view('getDocuments.ejs', {
      error: err,
    });
    request.server.error(`An error occurred: ${err.message}`);
  }
  return reply;
};

module.exports = { getDocuments };
