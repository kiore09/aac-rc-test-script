const express = require('express');
const router = express.Router();
const gqlclientController = require('../controllers/gqlclient.controller');

router
    .get('/', gqlclientController.gqlHomeView)
    .get('/graphqlclient', gqlclientController.requestQueryView)
    .post('/requestQuery', gqlclientController.requestQuery);

module.exports = router;