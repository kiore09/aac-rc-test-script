/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 06-01-2023
Description: This plugin is part of the Firestore sample template.
===========================================================================
*/

'use strict'

const fp = require('fastify-plugin')

/*
 * For a complete breakdown of Fastify plugins, see:
 * https://www.fastify.io/docs/latest/Guides/Plugins-Guide/
 */

const documents = require('../../utils/getDocuments')

const getDocuments = async (fastify, opts) => {
  /*
   * Shared utils can be added and accessed via Fastify decorators.
   * For more details see: https://www.fastify.io/docs/latest/Guides/Plugins-Guide/#decorators
   */
  fastify.decorate('getDocuments', documents)
}

module.exports = fp(getDocuments, {
  name: 'firestore',
  // Adding a plugin name to the dependencies array will ensure it loads before 'calculate-average'.
  dependencies: []
})
