'use strict'

/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 04-23-2024
Description: Adds a plugin for calculating date difference.
information.
===========================================================================
*/

import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import calculateDateDiff from '../../utils/calculateDateDiff';

/*
 * For a complete breakdown of Fastify plugins, see:
 * https://www.fastify.io/docs/latest/Guides/Plugins-Guide/
 * https://fastify.dev/docs/latest/Reference/TypeScript/#plugins
 */

declare module 'fastify' {
  interface FastifyInstance {
    calculateDateDiff: (month: number, day: number) => number;
  }
}

const calculateDateDiffPlugin: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  /*
   * Shared utils can be added and accessed via Fastify decorators.
   * For more details see: https://www.fastify.io/docs/latest/Guides/Plugins-Guide/#decorators
   */
  fastify.decorate('calculateDateDiff', calculateDateDiff)
}

module.exports = fp(calculateDateDiffPlugin, {
  name: 'calculate-date-diff',
  // Adding a plugin name to the dependencies array will ensure it loads before 'calculate-date-diff'.
  dependencies: []
})
