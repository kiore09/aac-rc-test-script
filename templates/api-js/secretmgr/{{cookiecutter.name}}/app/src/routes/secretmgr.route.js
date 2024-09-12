const express = require('express');
const router = express.Router();
const secretmgrController = require('../controllers/secretmgr.controller');

router
    .get('/', secretmgrController.homeView)
    .get('/secret', secretmgrController.secretView)
    .post('/secret/value', secretmgrController.getSecretValue);

module.exports = router;
