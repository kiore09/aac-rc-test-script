const express = require('express');
const router = express.Router();
const memoryController = require('../controllers/memstore.controller');

router
    .get('/memstore', memoryController.memstore)
    .post('/memstore/create', memoryController.redisData);

module.exports = router;
