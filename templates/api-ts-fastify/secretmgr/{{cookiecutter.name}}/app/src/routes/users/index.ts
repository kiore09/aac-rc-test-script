'use strict'

import { FastifyInstance, FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';
import User from '../../models/user';

declare module 'fastify' {
  interface FastifyInstance {
    users: {
      getUsers: () => User[];
      getUserById: (id: number) => User | undefined;
    }
  }
}

const getUsersRoute: FastifyPluginAsync = async (fastify: FastifyInstance, opts: any) => {
  /**
   * @openapi
   * /users:
   *   get:
   *     operationId: getAllUsers
   *     summary : Get all users
   *     tags:
   *       - users
   *     description: Returns all users in the "database"
   *     responses:
   *       200:
   *         description: Successful operation
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/User'
   */

  fastify.get("/", async (request: FastifyRequest, reply: FastifyReply) => {
    const users = await fastify.users.getUsers();
    return users;
  });

};

export default getUsersRoute;
