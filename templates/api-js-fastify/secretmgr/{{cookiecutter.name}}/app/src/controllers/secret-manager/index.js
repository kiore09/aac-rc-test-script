/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 10-01-2022
Description: This sample controller demonstrates retrieving secrets from 
the Fastify secrets plugin for GCP. The secret value is loaded at build
time and accessed using "secrets.gcp[]".
===========================================================================
*/

'use strict'

const { secretName } = require('../../../config')

const getSecretIndex = async (request, reply) => {
    const { query: { validated } } = request;
    reply.view('secret.ejs', { secretName, validated });
    return reply;
  }

const getSecret = async (request, reply) => {
    const { body: { secretName, secretValue } } = request;
    if (secretValue === request.server.secrets.gcp[secretName]) {
      request.server.log.info('secret validated');
      return reply.redirect('/secret-manager?validated=true');
    }
    request.server.log.warn('Incorrect secret value');
    return reply.redirect('/secret-manager/');
}

  
module.exports = {getSecretIndex, getSecret};