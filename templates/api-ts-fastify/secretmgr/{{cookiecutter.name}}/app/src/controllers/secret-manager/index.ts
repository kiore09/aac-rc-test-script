import { SecretManagerServiceClient } from '@google-cloud/secret-manager';
import config from '../../config';
import stringMask from '../../utils/stringMask';
import type { FastifyReply, FastifyRequest } from 'fastify';

const secretManagerServiceClient = new SecretManagerServiceClient();

const { secretName, projectId } = config;

interface RequestWithSecretValue extends FastifyRequest {
  secretValue?: string;
}

const getSecretPage = async (request: RequestWithSecretValue, reply: FastifyReply) => {
  const secretValue = request.secretValue || '';
  reply.view('secret.ejs', { secretName, secretValue });
  return reply;
};

const getSecretValue = async (request: RequestWithSecretValue, reply: FastifyReply) => {
  const [version] = await secretManagerServiceClient.accessSecretVersion({
    name: `projects/${projectId}/secrets/${secretName}/versions/latest`,
  });
  // @ts-ignore
  const secret = version.payload.data.toString();
  if (secret === undefined) {
    throw new Error("Unable to retrieve secret!");
  }
  request.secretValue = stringMask(secret);
  return getSecretPage(request, reply);
};

export { getSecretPage, getSecretValue };
