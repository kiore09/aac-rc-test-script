/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 25-07-2024
Description: This sample controller demonstrates retrieve secrets from 
Google Cloud Secret Manager.
===========================================================================
*/

import { Request, Response } from 'express';
import * as secretManager from '../utils/secret-manager';
import config from '../config';
import logger from '../utils/sample.logger';
import stringMask from '../utils/stringMask';

let error: string = ''; // Return error message

interface RequestWithSecretValue extends Request {
  secretValue?: string;
}

/**
 * Server endpoint that shows the secret form whenever a client hits
 * GET / (e.g. localhost:4005)
 * @param req Express request object
 * @param res Express request object
 */
const homeView = async (req: RequestWithSecretValue, res: Response): Promise<void> => {
  res.render('index');
};

/**
 * Server endpoint that shows the secret form whenever a client hits
 * GET /secret (e.g. localhost:4005)
 * @param req Express request object
 * @param res Express request object
 */
const secretView = (req: RequestWithSecretValue, res: Response): void => {
  const secret = config.secretName;
  const secretValue = req.secretValue || '';
  res.render('secret', { secret: secret, secretValue: secretValue });
};

/**
 * Server endpoint that calls GCP secret manager method: accessSecretVersion() to retrieve secret whenever a client hits
 * POST / (e.g. localhost:4005)
 * @param req Express request object
 * @param res Express request object
 */
const getSecretValue = async (req: RequestWithSecretValue, res: Response): Promise<void> => {
  const secretName = `projects/${config.projectId}/secrets/${config.secretName}/versions/latest`; // Ex: projects/123456789/secrets/sample-secret-id/versions/version-number
  try {
    const version = await secretManager.getSecret(secretName);
    logger.info('Retrieving secret ...');

    // Decode secret value, then mask
    // @ts-ignore
    const secret = version.payload.data.toString();
    req.secretValue = stringMask(secret);

    return secretView(req, res);
  } catch (err) {
    error = (err as Error).message;
    res.render('secret', {
      message: 'Unable to retrieve secret!',
      error: error,
    });
    logger.error(`An Error Occurred: ${error}`);
  }
};

export { homeView, secretView, getSecretValue };
