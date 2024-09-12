const express = require('express');
const router = express.Router();
const publisherController = require('../controllers/publisher.controller');

router
    .get('/', publisherController.publisher)
    .get('/publisher', publisherController.getCollectionInfo)
    .post('/publisher/create', publisherController.addDocument);

module.exports = router;
