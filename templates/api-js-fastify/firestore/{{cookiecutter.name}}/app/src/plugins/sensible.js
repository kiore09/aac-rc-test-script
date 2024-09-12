/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 06-01-2023
Description: This plugin adds utilities to handle http errors
===========================================================================
*/

'use strict'

const fp = require('fastify-plugin')

/**
 * This plugins adds some utilities to handle http errors
 *
 * @see https://github.com/fastify/fastify-sensible
 */

module.exports = fp(async function (fastify, opts) {
  fastify.register(require('@fastify/sensible'), {
    errorHandler: false
  })
})
