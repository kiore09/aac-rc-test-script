'use strict'

const firestoreController = require('../../controllers/firestore/index');

module.exports = async function (fastify, opts) {
  fastify.get('/', firestoreController.getDocuments)
}
