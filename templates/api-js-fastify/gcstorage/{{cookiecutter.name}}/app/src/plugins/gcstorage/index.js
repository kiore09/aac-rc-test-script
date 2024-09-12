'use strict'

/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 10-01-2022
Description: Adds the plugin for reading blobs from a bucket, creating new blobs,
and saving those new blobs to a bucket.
===========================================================================
*/

const fp = require('fastify-plugin')

/*
 * For a complete breakdown of Fastify plugins, see:
 * https://www.fastify.io/docs/latest/Guides/Plugins-Guide/
 */

const {getStorageFiles, uploadStorageFile} = require('../../utils/gcstorage')

const gcstorage = async (fastify, opts) => {
  /*
   * Shared utils can be added and accessed via Fastify decorators.
   * For more details see: https://www.fastify.io/docs/latest/Guides/Plugins-Guide/#decorators
   */
  fastify.decorate('getStorageFiles', getStorageFiles)
  fastify.decorate('uploadStorageFile', uploadStorageFile)
}


module.exports = fp(gcstorage, {
  name: 'storage-manager',
  // Adding a plugin name to the dependencies array will ensure it loads before 'gcstorage'.
  dependencies: []
})