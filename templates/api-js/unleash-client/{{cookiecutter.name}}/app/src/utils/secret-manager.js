const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');
const client = new SecretManagerServiceClient({fallback: true}); // Initialize secret manager
const logger = require('../utils/sample.logger');
/**
 * Retrieve secret from secret manager
 * @param secretName
 */
const getSecret = async (secretName) => {
  try {
    logger.info("Retrieving secret");
    if (!secretName) {
      throw new TypeError('secretName is required!');
    }
    if (typeof secretName !== 'string') {
      throw new TypeError('secretName must be a string!');
    }

    const [secret] = await client.accessSecretVersion({
      name: secretName,
    })  

    logger.info("Secret found");
    return secret;
  } catch (error) {
    error.name = 'SecretAccessError';
    logger.error(`Error: ${error}`);
    throw error;
  }
};

module.exports = {getSecret};
