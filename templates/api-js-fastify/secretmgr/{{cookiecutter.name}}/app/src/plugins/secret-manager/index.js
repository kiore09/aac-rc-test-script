'use strict'

/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 10-01-2022
Description: Adds the plugin for retrieving secrets from GCP to the fastify
instance.
===========================================================================
*/

const FastifySecretsGcp = require('fastify-secrets-gcp')

/*
 * For details on "fastify-secrets-gcp", see:
 *   https://github.com/nearform/fastify-secrets-gcp#readme
 *   https://github.com/nearform/fastify-secrets-core#readme
 */

const { secretName } = require('../../../config')
const getSecretId = require('../../utils/getSecretId')

/*
 * All secrets added to the config.secrets object will be fetched
 * and added to the fastify instance at build time.
 * They will be accessible through the "secrets.gcp" namespace.
 * eg, fastify.secrets.gcp.<secret-name>
 *
 * In order to re-fetch and update secrets, the "refresh" method can
 * be called.
 * eg, fastify.secrets.gcp.refresh()
 */

module.exports = FastifySecretsGcp
module.exports.autoConfig = {
  namespace: 'gcp',
  secrets: {
    [secretName]: getSecretId({ name: secretName })
  }
}
