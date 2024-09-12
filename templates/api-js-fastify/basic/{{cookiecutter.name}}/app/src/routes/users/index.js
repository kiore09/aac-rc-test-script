'use strict'

module.exports = async function (fastify, opts) {
  /**
   * @openapi
   * /users:
   *   get:
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

  fastify.get('/', async function (request, reply) {
    const users = await fastify.users.getUsers()
    return users
  })

}
