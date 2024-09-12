'use strict'

/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 04-23-2024
Description: Adds a plugin for generating and returning sample User
information.
===========================================================================
*/

import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import User from '../../models/user';

declare module 'fastify' {
  interface FastifyInstance {
    users: {
      getUsers: () => User[];
      getUserById: (id: number) => User | undefined;
    }
  }
}

const generateUsers = (n: number) => {
  const users = []
  for (let i = 1; i <= n; i++) {
    users.push(new User(i, `user-${i}`, `tester-${i}`))
  }
  return users
}

const users: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  const userList = generateUsers(5);
  const getUsers = (): User[] => userList;
  const getUserById = (id: number): User | undefined => {
    const users = getUsers()
    return users.find(({ userId }) => userId === id)
  }

  fastify.decorate('users', {
    getUsers,
    getUserById
  })
}

export default fp(users, {
  name: 'users',
  dependencies: []
})
