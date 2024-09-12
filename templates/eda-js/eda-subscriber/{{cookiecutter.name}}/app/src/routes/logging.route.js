const express = require('express');
const router = express.Router();
const loggingController = require('../controllers/logging.controller');

router
    .get('/', loggingController.index)
    .get('/infoMsg', loggingController.infoMsg)
    .get('/warnMsg', loggingController.warnMsg)
    .get('/errorMsg', loggingController.errorMsg);

module.exports = router;
