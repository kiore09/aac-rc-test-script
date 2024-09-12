const Customer = require('../models/customer');
const {insertIntoTable} = require('../controllers/cqrsCmd.controller');
const logger = require("../utils/sample.logger");

const createCustomer = async (req, res) => {
    try {
        let customer = new Customer(req.body);
        await insertIntoTable(customer);
        res.status(200).json(customer);
    } catch (err) {
        logger.error(`Failed to insert customer: ${err}`);
        if (err.name == 'SQL Error') {
            res.status(400).send(`SQL Error.\n\n${err.message}`);
            return;
        }
        res.status(500).send(`Internal Server Error.\n\n${err}`);
    }
}

module.exports = {createCustomer}