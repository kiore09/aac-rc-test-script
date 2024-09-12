/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 27-12-2022
Description: This sample controller demonstrates retrieve secrets from 
Google Cloud Secret Manager.
===========================================================================
*/

const secretManager = require('../utils/secret-manager');
const config = require('../../config');
const logger = require('../utils/sample.logger');
const stringMask = require('../utils/stringMask');
let error = ''; // Return error message
/**
 * Server endpoint that shows the secret form  whenever a client hits
 * GET / (e.g. localhost:4005)
 * @param req Express request object
 * @param res Express request object
 */

const homeView = async (req, res) => {
  res.render('index');
};
/**
 * Server endpoint that shows the secret form  whenever a client hits
 * GET /secret (e.g. localhost:4005)
 * @param req Express request object
 * @param res Express request object
 */

const secretView = (req, res) => {
  const secret = config.secretName;
  const secretValue = req.secretValue || '';
  res.render('secret', {secret: secret, secretValue: secretValue});
};

/**
 * Server endpoint that calls GCP secret manager method: accessSecretVersion() to retrieve secret whenever a client hits
 * POST / (e.g. localhost:4005)
 * @param req Express request object
 * @param res Express request object
 */

const getSecretValue = async (req, res, next) => {
  const secretName = `projects/${config.projectId}/secrets/${config.secretName}/versions/latest`; // Ex: projects/123456789/secrets/sample-secret-id/versions/version-number
  try {
    const version = await secretManager.getSecret(secretName);
    logger.info('Retrieving secret ...');
    // Decode secret value, then mask
    req.secretValue = stringMask.mask(new TextDecoder('utf-8').decode(version.payload.data));
    return next(secretView(req, res));
  } catch (err) {
    error = err.message;
    res.render('secret', {
      message: 'Unable to retrieve secret!',
      error: error,
    });
    logger.error(`An Error Occurred: ${error}`);
  }
};

module.exports = {homeView, secretView, getSecretValue};
