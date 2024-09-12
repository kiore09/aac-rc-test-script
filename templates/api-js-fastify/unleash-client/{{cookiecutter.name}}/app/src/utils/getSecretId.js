'use strict'
/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 10-01-2022
Description: This function generates the ID for a secret on GCP, based on
the input 'name'.
===========================================================================
*/

const config = require('../../config')

const getSecretId = ({
  projectId = config.unleash_secret_gcpProjectId,
  name = config.unleash_client_secret_name,
  version = 'latest'
}) => `projects/${projectId}/secrets/${name}/versions/${version}`

module.exports = getSecretId
