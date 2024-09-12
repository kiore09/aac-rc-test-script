/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 27-12-2022
Description: This service is part of the Firestore GCP demonstration,
get documents from the Firestore service
===========================================================================
*/

const Firestore = require('@google-cloud/firestore');
const config = require('../../config');

const projectId = config.projectId; // Your GCP project ID
const firestoreCollection = config.firestoreCollection; // your GCP Firestore collection name

class FirestoreClient {
  constructor() {
    this.firestore = new Firestore({
      projectId,
      firestoreCollection,
    });
  }

  async getDocuments() {
    const collectionReference = this.firestore.collection(firestoreCollection);
    const response = await collectionReference
      .get();
    return response.docs;
  }
}

module.exports = new FirestoreClient();
