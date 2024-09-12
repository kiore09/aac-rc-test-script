'use strict'

const healthcheckController = require('../controllers/healthcheck');

module.exports = async function (fastify, opts) {
  fastify.get('/startup', healthcheckController.startup);
  fastify.get('/liveness', healthcheckController.liveness)
  fastify.get('/readiness', healthcheckController.readiness)
}
