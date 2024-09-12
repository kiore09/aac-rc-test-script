'use strict'

module.exports = async function (fastify, opts) {

  /**
   * @openapi
   * /user/{userId}:
   *   get:
   *     operationId: getUserById
   *     summary : Get user by id
   *     tags:
   *       - users
   *     description: Returns the user with the input id
   *     parameters:
   *       - name: userId
   *         in: path
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       400:
   *         description: Invalid input id
   *       404:
   *         description: No user found with input id
   *       200:
   *         description: Successful operation
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   */

  fastify.get('/:id', async function (request, reply) {
    const { id } = request.params
    const user = await fastify.users.getUserById(Number(id))
    if (!user) {
      reply.code(404).send({ error: 'User not found' })
    } else {
      return user
    }
  })
}
