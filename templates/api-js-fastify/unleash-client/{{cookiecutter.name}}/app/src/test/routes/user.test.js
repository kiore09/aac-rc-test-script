'use strict'

const { test } = require('tap')
const { build } = require('../helper')

test('route: /user/:id', async (t) => {
  const { test } = t

  const app = await build(t)
  test('GET /user/:id', async t => {

    const expected = { userId: 1, firstName: "user-1", lastName: "tester-1" };

    const res = await app.inject({
      url: '/user/1'
    })

    const user = res.json()

    t.same(user, expected)
  })

})