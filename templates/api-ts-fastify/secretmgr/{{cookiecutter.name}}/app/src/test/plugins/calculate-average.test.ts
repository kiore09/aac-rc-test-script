'use strict'

import { test } from 'tap';
import Fastify from 'fastify';
import calculateAverage from '../../plugins/calculate-average';

test('calculate-average plugin', async (t) => {
  const fastify = Fastify();
  fastify.register(calculateAverage);

  await fastify.ready();
  t.ok(fastify.hasDecorator('calculateAverage'));
  t.equal(fastify.calculateAverage(1, 2), 1.5);
});
