// Import firestore service
const FirestoreService = require('../services/firestore.service');
const logger = require('../utils/sample.logger');
const config = require('../../config');

const projectId = config.projectId; // Your GCP project ID
const firestoreCollection = config.firestoreCollection; // your GCP Firestore collection name
let id = undefined;
let path = undefined;
const firestoreService = new FirestoreService(); // Init service

const error = '';

const publisher = (req, res) => {
  res.render('index');
};

const getCollectionInfo = async (req, res) => {
  try {
    res.render('publisher', {
      projectId: projectId,
      firestoreCollection: firestoreCollection,
      id,
      path,
    });
  } catch (err) {
    res.render('publisher', {
      error: err.message,
    });
    logger.error(`An error occurred: ${err.message}`);
  }
};

const addDocument = async (req, res) => {
  try {
    const data = firestoreService.createFirestorePayload(req.body.payload);
    const doc = firestoreService.docRef();
    await doc.set(data);
    id = doc.id;
    path = doc.path;
    res.render('publisher', {
      projectId: projectId,
      firestoreCollection: firestoreCollection,
      id,
      path,
    });
  } catch (err) {
    res.render('publisher', {
      error: error,
    });
    logger.error(`An error occurred: ${err.message}`);
  }
};

module.exports = {publisher, addDocument, getCollectionInfo};
