const express = require('express');
const router = express.Router();
const queryController = require('../controllers/cqrsQuery.controller');

router
    .get('/cqrsquery', queryController.getDocuments);

module.exports = router;
