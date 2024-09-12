'use strict'
const storageController = require('../../controllers/gcstorage/index');

module.exports = async function (fastify, opts) {
  fastify.get('/', storageController.getStorageIndex);

  fastify.post('/upload', storageController.uploadBucket);
}
