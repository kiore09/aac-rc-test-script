'use strict'

const path = require('path')
const AutoLoad = require('@fastify/autoload')
const config = require('../config')
const ffPlugin = require('fastify-feature-flags');
const { UnleashProvider } = require('fastify-feature-flags/dist/providers/unleash');
const secretManager = require('./utils/secret-manager');
const getSecretId = require('./utils/getSecretId')

module.exports = async function (fastify, opts) {
  // Path of Swagger file
  const swaggerPath = path.join(__dirname, '../../api/example.oas3.json');

  fastify.register(require('@fastify/view'), {
    engine: {
      ejs: require('ejs')
    },
    root: path.join(__dirname, 'views')
  })

  // Required for supporting the application/x-www-form-urlencoded content type
  fastify.register(require('@fastify/formbody'))

  // Register Swagger
  fastify.register(require('@fastify/swagger'), {
    mode: 'static',
    specification: {
      path: swaggerPath
    },
    exposeRoute: true
  })
  // Swagger UI configuration
  fastify.register(require('@fastify/swagger-ui'), {
    routePrefix: '/documentation',
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false
    },
    uiHooks: {
      onRequest: function (request, reply, next) { next() },
      preHandler: function (request, reply, next) { next() }
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, request, reply) => { return swaggerObject },
    transformSpecificationClone: true
  })

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })

  // Do not touch the previous lines

  if (config.enable_external_services) {
    // Retrieve secret from secret-manager for unleash authentication
    const secretName = getSecretId({ name: config.unleash_client_secret_name });
    const authToken = await secretManager.getSecret(secretName);

    // Create an instance of the UnleashProvider
    const unleashProvider = new UnleashProvider({
      url: config.unleash_api_url,
      appName: 'unleash-client-demo',
      instanceId: 'demo-instance',
      customHeaders: { Authorization: new TextDecoder('utf-8').decode(authToken.payload.data) },
    });
    // Register the fastify-feature-flags plugin with the ConfigProvider
    fastify.register(ffPlugin, { providers: [unleashProvider] });
  }
}

// Disables auto-logging "incoming request" and "request completed"
// This prevents logs spam from K8s liveness probe
module.exports.options = {
  disableRequestLogging: true
}