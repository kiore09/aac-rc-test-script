'use strict'

import type { FastifyInstance, FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';
import { getBirthday, postBirthday } from '../controllers/users/index';

interface BirthdayBody {
  name: string;
  birthMonth: string;
  birthDay: string;
}

const birthdayPlugin: FastifyPluginAsync = async (fastify: FastifyInstance, opts: any) => {
  fastify.get('/birthday', getBirthday);

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
    preValidation: (request: FastifyRequest, reply: FastifyReply, done: () => void) => {
        // This hook will always be executed after the shared `preValidation` hooks
        // Generally speaking, validation of globally required fields can be done here
        fastify.log.info('preValidation Hook')
        done()
    },
    preHandler: (request: FastifyRequest<{ Body: BirthdayBody }>, reply: FastifyReply, done: () => void) => {
        // This hook will always be executed after the shared `preHandler` hooks
        // Generally speaking, authentication can be done here
        fastify.log.info('preHandler Hook')

        // In this example we ensure the body parameters are valid before continuing
        const { name, birthMonth, birthDay } = request.body
        if (isNaN(Number(birthMonth)) || isNaN(Number(birthDay))) {
          fastify.log.warn("NaN in request")
          reply.code(400).hijack()
          reply.raw.end('{"statusCode":400,"error":"Bad Request","message":"NaN in request"}')
        }
        done()
    },
    onSend: (request: FastifyRequest, reply: FastifyReply, payload: unknown, done: (err: Error | null, newPayload?: unknown) => void) => {
        // This hook will always be executed after the shared `onSend` hooks
        // Generally speaking, the response payload and reply can be modified here before it is sent
        fastify.log.info('onSend Hook')
        // In this example intercept the payload with data and transform it into a new JSON payload
        if (reply.statusCode == 200)
        {
          let payloadObject = JSON.parse(payload as string)
          const newPayload = {message: `Hello ${payloadObject.name}, ${payloadObject.days} more days before your birthday!`};
          done(null, JSON.stringify(newPayload))
        } else {
          done(null, payload)
        }
    },
    handler: postBirthday
  })
}

export default birthdayPlugin;
