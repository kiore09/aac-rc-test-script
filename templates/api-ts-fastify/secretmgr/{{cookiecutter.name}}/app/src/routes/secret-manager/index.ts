'use strict'

import type { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { getSecretPage, getSecretValue } from '../../controllers/secret-manager';

const routes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.get('/', getSecretPage);
  fastify.post('/value', getSecretValue);
};

export default routes;
