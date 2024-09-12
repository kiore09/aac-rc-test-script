'use strict'
// This file contains code that we reuse
// between our tests.

const fastifyInjector = require('@autotelic/fastify-injector')
const fp = require('fastify-plugin')
const rootPlugin = require('../server')

const mockFastifyRedis = (fastify, opts, done) => {
  fastify.decorate('redis', {})
  done()
}

// automatically build and tear down our instance
async function build (t, injectorOpts = {
  plugins: {
    // @fastify/redis is mocked so we can test the application
    // without relying on external apis
    '@fastify/redis': mockFastifyRedis
  }
}) {
  /*
   * fastify injector builds the app and returns a fastify instance
   * with the specified plugins, decorators, or symbols injected.
   * For more details on fastify-injector, see:
   *   https://github.com/autotelic/fastify-injector#readme
   */
  const app = fastifyInjector(injectorOpts)
  await app.register(fp(rootPlugin))
  await app.ready()

  // tear down our app after we are done
  t.teardown(app.close.bind(app))

  return app
}

module.exports = {
  build
}
