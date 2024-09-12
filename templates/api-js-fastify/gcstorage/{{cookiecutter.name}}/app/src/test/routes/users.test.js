'use strict'

const { test } = require('tap')
const { build } = require('../helper')

test('route: /users', async (t) => {
  const { test } = t

  const app = await build(t)

  test('GET /users', async t => {
    const expected = [
      { userId: 1, firstName: "user-1", lastName: "tester-1" },
      { userId: 2, firstName: "user-2", lastName: "tester-2" },
      { userId: 3, firstName: "user-3", lastName: "tester-3" },
      { userId: 4, firstName: "user-4", lastName: "tester-4" },
      { userId: 5, firstName: "user-5", lastName: "tester-5" },
    ];

    const res = await app.inject({
      url: '/users'
    })

    const users = res.json()
    t.same(users, expected)
  })
})