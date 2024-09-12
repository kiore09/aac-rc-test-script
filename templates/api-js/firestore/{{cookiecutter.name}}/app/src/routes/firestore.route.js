const express = require('express');
const router = express.Router();
const firestoreController = require('../controllers/firestore.controller');

router
    .get('/firestore/read', firestoreController.getDocuments);

module.exports = router;
