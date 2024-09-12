'use strict'

/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 04-23-2024
Description: Controller advice for modifying the returned JSON generated
when serializing the BirthdayMessage.
===========================================================================
*/

import type { FastifyReply, FastifyRequest } from 'fastify';

interface UserParams {
  id: string;
}

interface BirthdayBody {
  name: string;
  birthMonth: string;
  birthDay: string;
}

const getUsers = async (request: FastifyRequest, reply: FastifyReply) => {
  const users = request.server.users.getUsers();
  return { data: users };
};

const getUserById = async (request: FastifyRequest<{ Params: UserParams }>, reply: FastifyReply) => {
  const { id } = request.params;
  const user = request.server.users.getUserById(Number(id));
  if (!user) {
    reply.code(404).send("User not found");
  }
  return request.server.users.getUserById(Number(id));
};

const getBirthday = async (request: FastifyRequest, reply: FastifyReply) => {
  reply.view('birthday.ejs');
  return reply;
};

const postBirthday = async (request: FastifyRequest<{ Body: BirthdayBody }>, reply: FastifyReply) => {
  const {
    body: { name, birthMonth, birthDay }
  } = request;
  const remainingDays = request.server.calculateDateDiff(Number(birthMonth), Number(birthDay));
  return { name: name, days: remainingDays };
};

export { getUsers, getUserById, getBirthday, postBirthday };
