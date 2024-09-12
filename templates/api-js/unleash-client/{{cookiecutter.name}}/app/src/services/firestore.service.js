const {Firestore, FieldValue} = require('@google-cloud/firestore');
const config = require('../../config');

class FirestoreService {
// Create a new client
  firestore = new Firestore({projectId: config.projectId});

  // Set collection
  firestoreCol = this.firestore.collection(config.firestoreCollection);

  createFirestorePayload(payload) {
    const data = {
      payload,
      created_by: 'demo-publisher',
      created_time: FieldValue.serverTimestamp(),
    };
    return data;
  }

  docRef() {
    const date = new Date();
    // Set format date
    const formatDate = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'}).format(date);
    const dateParts = formatDate.split('/');

    // Set format time
    const formatTime = new Intl.DateTimeFormat('en-US', {hour: '2-digit', minute: 'numeric', second: 'numeric'}).format(date).replace(/[a-zA-Z]|\:| /g, '');

    const docName = `doc-${dateParts[2]}${dateParts[0]}${dateParts[1]}-${formatTime}`;
    const docRef = this.firestoreCol.doc(docName);

    return docRef;
  }
}

module.exports = FirestoreService;
