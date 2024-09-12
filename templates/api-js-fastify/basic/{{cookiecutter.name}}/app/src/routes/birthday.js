'use strict'

const usersController = require('../controllers/users/index');

module.exports = async function (fastify, opts) {
  fastify.get('/birthday', usersController.getBirthday);

  fastify.route({
    method: 'POST',
    url: '/birthday',
    schema: {
      body: {
        type: 'object',
        required: ['name', 'birthMonth', 'birthDay'],
        properties: {
            name: { type: 'string', minLength: 1 },
            birthMonth: { type: 'string', minLength: 1  },
            birthDay: { type: 'string', minLength: 1 },
        }
      }
    },
    // Hooks defined within a route will only be executed within this scope
    preValidation: function (request, reply, done) {
        // This hook will always be executed after the shared `preValidation` hooks
        // Generally speaking, validation of globally required fields can be done here
        fastify.log.info('preValidation Hook')
        done()
    },
    preHandler: function (request, reply, done) {
        // This hook will always be executed after the shared `preHandler` hooks
        // Generally speaking, authentication can be done here
        fastify.log.info('preHandler Hook')

        // In this example we ensure the body parameters are valid before continuing
        const {
          body: { name, birthMonth, birthDay }
        } = request
        if (isNaN(birthMonth) || isNaN(birthDay)){
          fastify.log.warn("NaN in request")
          reply.code(400).hijack()
          reply.raw.end('{"statusCode":400,"error":"Bad Request","message":"NaN in request"}')
        }
        done()
    },
    onSend: function (request, reply, payload, done) {
        // This hook will always be executed after the shared `onSend` hooks
        // Generally speaking, the response payload and reply can be modified here before it is sent
        fastify.log.info('onSend Hook')
        // In this example intercept the payload with data and transform it into a new JSON payload
        if (reply.statusCode == 200)
        {
          let payloadObject = JSON.parse(payload)
          const newPayload = {message: `Hello ${payloadObject.name}, ${payloadObject.days} more days before your birthday!`};
          done(null, JSON.stringify(newPayload))
        } else {
          done(null, payload)
        }
    },
    handler: usersController.postBirthday
  })
}