const express = require('express');
const router = express.Router();
const apiClientController = require('../controllers/apiClient.controller');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

router
    .get('/', apiClientController.homeView)
    .get('/send', apiClientController.emailView)
    .post('/send/Emails', upload.array('attachment'), apiClientController.sendEmails);

module.exports = router;
