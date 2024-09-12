'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/infoMsg', async function (request, reply) {
    fastify.log.info('This is a sample info message from server')
    return 'This is a sample info message'
  })

  fastify.get('/warnMsg', async function (request, reply) {
    fastify.log.warn('This is a sample warn message from server')
    return 'This is a sample warn message'
  })

  fastify.get('/errorMsg', async function (request, reply) {
    fastify.log.error('This is a sample error message from server')
    return 'This is a sample error message'
  })
}
