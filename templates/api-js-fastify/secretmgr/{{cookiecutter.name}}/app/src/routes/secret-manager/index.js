'use strict'

const secretManagerController = require('../../controllers/secret-manager/index');

module.exports = async function (fastify, opts) {
fastify.get('/', secretManagerController.getSecretIndex)

  fastify.post('/validate', secretManagerController.getSecret)
}