const express = require('express');
const router = express.Router();
const cqrsCmdController = require('../controllers/cqrsCmd.controller');

router
  .get("/", cqrsCmdController.homeView)
  .get("/cmd", cqrsCmdController.getCommandPage)
  .post("/cmd", cqrsCmdController.createCmdCustomer)

module.exports = router
