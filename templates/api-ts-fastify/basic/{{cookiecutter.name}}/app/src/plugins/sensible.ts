'use strict'

import fp from 'fastify-plugin';
import sensible from '@fastify/sensible';
import { FastifyInstance, FastifyPluginAsync } from 'fastify';

/**
 * This plugins adds some utilities to handle http errors
 *
 * @see https://github.com/fastify/fastify-sensible
 */

const plugin: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.register(sensible);
};

export default fp(plugin);
