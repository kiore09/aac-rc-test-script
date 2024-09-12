const express = require('express');
const router = express.Router();
const loggingController = require('../controllers/logging.controller');
const firestoreController = require('../controllers/firestore.controller');

router
    .get('/', loggingController.helloWorld)
    .get('/infoMsg', loggingController.infoMsg)
    .get('/warnMsg', loggingController.warnMsg)
    .get('/errorMsg', loggingController.errorMsg)
    .get('/test', firestoreController.getDocuments);

module.exports = router;
