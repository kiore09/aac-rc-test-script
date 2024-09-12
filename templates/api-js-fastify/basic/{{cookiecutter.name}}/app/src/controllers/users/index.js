'use strict'

/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 10-01-2022
Description: Controller advice for modifying the returned JSON generated
when serializing the BirthdayMessage.
===========================================================================
*/

const getUsers = async (request, reply) => {
  const users = request.server.users.getUsers()
  return {data: users}
}
  
const getUserById = async (request, reply) => {
  const { id } = request.params
  const user = request.server.users.getUserById(Number(id))
  if (!user) {
    reply.code(404).send("User not found")
  }
  return request.server.users.getUserById(Number(id))
}

const getBirthday = async (request, reply) => {
  reply.view('birthday.ejs');
  return reply;
}

const postBirthday = async (request, reply) => {
  const {
    body: { name, birthMonth, birthDay }
  } = request
  const remainingDays = request.server.calculateDateDiff(Number(birthMonth), Number(birthDay));
  return {name: name, days: remainingDays};
}
  
module.exports = {getUsers, getUserById, getBirthday, postBirthday};