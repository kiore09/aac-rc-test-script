'use strict'

const { test } = require('tap')
const Fastify = require('fastify')
const User = require('../../models/user')

const userPlugin = require('../../plugins/users')

test('users plugin', async t => {
  const fastify = Fastify()
  fastify.register(userPlugin)

  await fastify.ready()
  t.ok(fastify.hasDecorator('users'))

  const users = fastify.users.getUsers()
  t.equal(users.length, 5)
  users.forEach(user => {
    t.ok(user instanceof User)
  })

  const user1 = fastify.users.getUserById(1)
  t.same(user1, users[0])
})
