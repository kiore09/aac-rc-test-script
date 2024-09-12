const express = require('express');
const router = express.Router();
const subscriberController = require('../controllers/subscriber.controller');

router
    .get('/subscriber', subscriberController.consumer);

module.exports = router;
