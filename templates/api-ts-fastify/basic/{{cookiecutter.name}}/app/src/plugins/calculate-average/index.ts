'use strict'

/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 04-23-2024
Description: Adds the plugin for calculating the average of 2 numbers to
the fastify instance.
===========================================================================
*/
import type { FastifyInstance, FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import average from '../../utils/calculateAverage';

/*
 * For a complete breakdown of Fastify plugins, see:
 * https://www.fastify.io/docs/latest/Guides/Plugins-Guide/
 * https://fastify.dev/docs/latest/Reference/TypeScript/#plugins
 */

declare module 'fastify' {
  interface FastifyInstance {
    calculateAverage: (x: number, y: number) => number;
  }
}

const calculateAverage: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  /*
   * Shared utils can be added and accessed via Fastify decorators.
   * For more details see:
   * https://www.fastify.io/docs/latest/Guides/Plugins-Guide/#decorators
   */
  fastify.decorate('calculateAverage', average);
}

export default fp(calculateAverage, {
  name: 'calculate-average',
  // Adding a plugin name to the dependencies array will ensure it loads before 'calculate-average'.
  dependencies: [],
  fastify: '4.x'
})
