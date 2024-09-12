'use strict'

module.exports = async function (fastify, opts) {
  const unleashController = require('../../controllers/unleash-flag/index')
  fastify.get('/', unleashController.unleashFlags)
};

