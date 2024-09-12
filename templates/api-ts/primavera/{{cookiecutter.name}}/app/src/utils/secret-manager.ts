/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 27-12-2022
Description: This service is part of the apiClient controller to retrieve a secret from Secret Manager
===========================================================================
*/

import { SecretManagerServiceClient } from '@google-cloud/secret-manager';
import  logger  from '../utils/sample.logger';

const client = new SecretManagerServiceClient();
/**
 * Retrieve secret from secret manager
 * @param secretName - The name of the secret.
 */
const getSecret = async (secretName: string): Promise<string> => {
  try {
    if (!secretName) {
      throw new TypeError('secretName is required!');
    }
    if (typeof secretName !== 'string') {
      throw new TypeError('secretName must be a string!');
    }
    
    const [version] = await client.accessSecretVersion({
      name: secretName,
    });
    
    const payload = version.payload?.data?.toString(); // Convert to string

    logger.info('Secret found');
    return payload || '';
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`Error: ${error.message}`);
    }
    throw error;
  }
};

export { getSecret };
