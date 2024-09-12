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
    res.render('getDocuments', {
      error: err.message,
    });
    logger.error(`An error occurred: ${err.message}`);
  }
};

module.exports = {getDocuments};
