const express = require('express');
const router = express.Router();
const tokenParsingController = require('../controllers/tokenParsing.controller');

router
    .get('/', tokenParsingController.homeView)
    .get('/names', tokenParsingController.namesView)

module.exports = router;
