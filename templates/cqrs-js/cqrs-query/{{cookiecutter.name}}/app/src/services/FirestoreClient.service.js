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
