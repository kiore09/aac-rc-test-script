const express = require('express');
const router = express.Router();
const pubsubController = require('../controllers/pubsub.controller');

router
    .get('/', pubsubController.pubSub)
    .get('/pubsub', pubsubController.tryPubSub);

module.exports = router;
