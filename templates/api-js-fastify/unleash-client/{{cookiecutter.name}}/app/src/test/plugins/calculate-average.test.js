'use strict'

const { test } = require('tap')
const Fastify = require('fastify')

const calculateAverage = require('../../plugins/calculate-average')

test('calculate-average plugin', async t => {
  const fastify = Fastify()
  fastify.register(calculateAverage)

  await fastify.ready()
  t.ok(fastify.hasDecorator('calculateAverage'))
  t.equal(fastify.calculateAverage(1, 2), 1.5)
})
