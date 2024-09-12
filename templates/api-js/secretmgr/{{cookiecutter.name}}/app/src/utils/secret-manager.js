/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 27-12-2022
Description: This file is part of the secret-manager controller, demonstrates retrieve secrets from 
Google Cloud Secret Manager.
===========================================================================
*/


const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');
const client = new SecretManagerServiceClient({fallback: true}); // Initialize secret manager
const logger = require('../utils/sample.logger');
/**
 * Retrieve secret from secret manager
 * @param secretName
 */
const getSecret = async (secretName) => {
  try {
    if (!secretName) {
      throw new TypeError('secretName is required!');
    }
    if (typeof secretName !== 'string') {
      throw new TypeError('secretName must be a string!');
    }
    const [secret] = await client.accessSecretVersion({
      name: secretName,
    })  
    
    logger.info('Secret found');
    return secret;
  } catch (error) {
    error.name = 'SecretAccessError';
    logger.error(`Error: ${error}`);
    throw error;
  }
};

module.exports = {getSecret};
