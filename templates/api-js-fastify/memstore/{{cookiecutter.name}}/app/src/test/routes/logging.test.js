'use strict'

const { test } = require('tap')
const { build } = require('../helper')
test('route: /logging', async (t) => {
  const { test } = t

  const app = await build(t)
  test('logging/infoMsg', async t => {
    const expected = 'This is a sample info message'
    const { payload } = await app.inject({
      url: '/logging/infoMsg'
    })

    t.same(payload, expected)
  })

  test('logging/warnMsg', async t => {
    const expected = 'This is a sample warn message'
    const { payload } = await app.inject({
      url: '/logging/warnMsg'
    })

    t.same(payload, expected)
  })

  test('logging/errorMsg', async t => {
    const expected = 'This is a sample error message'
    const { payload } = await app.inject({
      url: '/logging/errorMsg'
    })

    t.same(payload, expected)
  })
})

