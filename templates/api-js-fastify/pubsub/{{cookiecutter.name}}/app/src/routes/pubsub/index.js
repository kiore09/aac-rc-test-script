'use strict'
const pubsubController = require('../../controllers/pubsub/index')

module.exports = async function (fastify, opts) {
  fastify.get('/', pubsubController.getPubsub)
}
