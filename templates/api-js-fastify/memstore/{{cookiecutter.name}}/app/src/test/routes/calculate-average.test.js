'use strict'

const { test } = require('tap')
const { build } = require('../helper')

test('/calculate-average', async t => {
  const app = await build(t)

  const expected = { average: '15.0' }
  const res = await app.inject({
    method: 'POST',
    url: '/calculate-average',
    payload: {
      x: 10,
      y: 20
    }
  })

  const data = res.json()

  t.same(data, expected)
})
