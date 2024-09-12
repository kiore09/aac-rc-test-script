const express = require('express');
const router = express.Router();
const postgresqlController = require('../controllers/postgresql.controller');

router
    .get('/', postgresqlController.homeView)
    .get('/postgresql', postgresqlController.testPostgres);

module.exports = router;
