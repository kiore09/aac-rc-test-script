'use strict'

import type { FastifyPluginAsync } from 'fastify';
import { startup, liveness, readiness } from '../controllers/healthcheck';

const healthcheckPlugin: FastifyPluginAsync = async (fastify, opts) => {
  fastify.get('/startup', startup);
  fastify.get('/liveness', liveness);
  fastify.get('/readiness', readiness);
};

export default healthcheckPlugin;
