'use strict'
import type { FastifyInstance, FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';

const loggingPlugin: FastifyPluginAsync = async (fastify: FastifyInstance, opts: any) => {
  fastify.get('/infoMsg', async (request: FastifyRequest, reply: FastifyReply) => {
    fastify.log.info('This is a sample info message from server');
    return 'This is a sample info message';
  });

  fastify.get('/warnMsg', async (request: FastifyRequest, reply: FastifyReply) => {
    fastify.log.warn('This is a sample warn message from server');
    return 'This is a sample warn message';
  });

  fastify.get('/errorMsg', async (request: FastifyRequest, reply: FastifyReply) => {
    fastify.log.error('This is a sample error message from server');
    return 'This is a sample error message';
  });
};

export default loggingPlugin;
