'use strict'

const { test } = require('tap')
const { build } = require('../helper')

test('default root route', async t => {
  const app = await build(t)

  const { statusCode, payload } = await app.inject({
    url: '/'
  })
  t.equal(statusCode, 200)
  t.ok(payload)
})
