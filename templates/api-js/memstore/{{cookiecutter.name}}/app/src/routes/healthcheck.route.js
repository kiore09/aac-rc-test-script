const express = require('express');
const router = express.Router();
const healthcheckController = require('../controllers/healthcheck.controller');

router
    .get('/startup', healthcheckController.startup)
    .get('/liveness', healthcheckController.liveness)
    .get('/readiness', healthcheckController.readiness);

module.exports = router;
