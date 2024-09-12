const fp = require('fastify-plugin')

/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 10-01-2022
Description: Adds the plugin for use the redis service.
===========================================================================
*/

module.exports = fp(async function (fastify, opts) {
  fastify.register(require('@fastify/redis'), opts)

fastify.decorate('sanitizeInput', function (input) {
  return input.toString().replace(/[\n\r]/g, '').trim().replace(/\s+/g, '');
})
})