const express = require('express');
const router = express.Router();
const controller = require('../controllers/commandApi.controller');

router
    /**
     * @openapi
     * /customers:
     *   post:
     *     summary : Create a new ccustomer
     *     tags:
     *       - customers
     *     description: Creates a new customer in the "database"
     *     responses:
     *       200:
     *         description: Successful operation
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Customer'
     */
    .post('/customers', controller.createCustomer)

module.exports = router ;