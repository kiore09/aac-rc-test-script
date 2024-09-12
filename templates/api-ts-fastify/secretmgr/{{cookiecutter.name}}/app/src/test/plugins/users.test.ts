'use strict'

import { test } from 'tap';
import Fastify from 'fastify';
import User from '../../models/user';
import userPlugin from '../../plugins/users';

test('users plugin', async (t) => {
  const fastify = Fastify();
  fastify.register(userPlugin);

  await fastify.ready();
  t.ok(fastify.hasDecorator('users'));

  const users = fastify.users.getUsers();
  t.equal(users.length, 5);
  users.forEach((user: User) => {
    t.ok(user instanceof User);
  });

  const user1 = fastify.users.getUserById(1);
  t.same(user1, users[0]);
});
