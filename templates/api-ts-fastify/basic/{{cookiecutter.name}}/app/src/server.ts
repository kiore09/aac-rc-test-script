'use strict'

import path from 'path';
import AutoLoad from '@fastify/autoload';
import fastifyView from '@fastify/view';
import ejs from 'ejs';
import formbody from '@fastify/formbody';
import type { FastifyRequest, FastifyReply } from 'fastify';
import fastify from 'fastify';
import config from './config';

const { port } = config;

async function server(fastifyInstance: any, opts: any) {
  // Path of Swagger file
  const swaggerPath = path.join(__dirname, "../../api/example.oas3.json");

  fastifyInstance.register(fastifyView, {
    engine: {
      ejs: ejs
    },
    root: path.join(__dirname, 'views')
  })

  // Required for supporting the application/x-www-form-urlencoded content type
  fastifyInstance.register(formbody)

  // Register Swagger
  fastifyInstance.register(require("@fastify/swagger"), {
    mode: "static",
    specification: {
      path: swaggerPath,
    },
    exposeRoute: true,
  });
  // Swagger UI configuration
  fastifyInstance.register(require("@fastify/swagger-ui"), {
    routePrefix: "/documentation",
    uiConfig: {
      docExpansion: "full",
      deepLinking: false,
    },
    uiHooks: {
      onRequest: function (
        request: FastifyRequest,
        reply: FastifyReply,
        next: () => void
      ) {
        next();
      },
      preHandler: function (
        request: FastifyRequest,
        reply: FastifyReply,
        next: () => void
      ) {
        next();
      },
    },
    staticCSP: true,
    transformStaticCSP: (header: string) => header,
    transformSpecification: (
      swaggerObject: Record<string, any>,
      request: FastifyRequest,
      reply: FastifyReply
    ) => {
      return swaggerObject;
    },
    transformSpecificationClone: true,
  });

  // This loads all plugins defined in plugins
  fastifyInstance.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  // This loads all plugins defined in routes
  fastifyInstance.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })

  return fastifyInstance
}

// Disables auto-logging "incoming request" and "request completed"
// This prevents logs spam from K8s liveness probe
server.options = {
  disableRequestLogging: true
}

// Create a Fastify instance with logging enabled
const fastifyInstance = fastify({ logger: true });

server(fastifyInstance, {}).then(() => {
  fastifyInstance.listen({ port: port, host: '0.0.0.0' })
    .then((address) => {
      console.log(`Server listening at ${address}`);
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
});

export default server;
