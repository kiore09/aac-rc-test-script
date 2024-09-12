'use strict'

import type { FastifyInstance, FastifyPluginAsync } from 'fastify';

const root: FastifyPluginAsync = async (fastify: FastifyInstance, opts: any) => {
  fastify.get('/', async (request, reply) => {
    reply.view('index.ejs');
    return reply;
  });
};

export default root;
