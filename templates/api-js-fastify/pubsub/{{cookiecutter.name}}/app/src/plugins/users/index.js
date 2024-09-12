'use strict'

/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 05-02-2024
Description: Adds a plugin for generating and returning sample User
information.
===========================================================================
*/

const fp = require('fastify-plugin')
const User = require('../../models/user')

const generateUsers = n => {
  const users = []
  for (let i = 1; i <= n; i++) {
    users.push(new User(i, `user-${i}`, `tester-${i}`))
  }
  return users
}

const users = async (fastify, opts) => {
  const users = generateUsers(5)
  const getUsers = () => users
  const getUserById = id => {
    const users = getUsers()
    return users.find(({ userId }) => userId === id)
  }

  fastify.decorate('users', {
    getUsers,
    getUserById
  })
}

module.exports = fp(users, {
  name: 'users',
  dependencies: []
})
