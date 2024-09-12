const express = require('express');
const router = express.Router();
const controller = require('../controllers/demoApi.controller');

router
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
    .get('/users', controller.getUsers)

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
    .get('/user/:userId', controller.getUserById)

module.exports = router ;