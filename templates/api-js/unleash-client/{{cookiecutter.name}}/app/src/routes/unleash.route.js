const express = require('express');
const router = express.Router();
const unleashController = require('../controllers/unleash.controller');

router
    .get('/', unleashController.index)
    .get('/unleashFlags', unleashController.unleashFlags)

module.exports = router;
