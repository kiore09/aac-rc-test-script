const logger = require('../utils/sample.logger')
const path = require("path");

/*
 Server endpoint that logs a sample info message to the logger whenever a client hits
 GET /infoMsg (e.g. localhost:4005/infoMsg)
*/

const infoMsg = (req, res) => {
    res.send("This is a sample info message")
    logger.info("This is a sample info message from server")
}

/*
 Server endpoint that logs a sample info message to the logger whenever a client hits
 GET /warnMsg (e.g. localhost:4005/warnMsg)
*/

const warnMsg = (req, res) => {
    res.send("This is a sample warn message")
    logger.warn("This is a sample warn message from server")
}

/*
Server endpoint that logs a sample info message to the logger whenever a client hits
GET /errorMsg (e.g. localhost:4005/errorMsg)
*/

const errorMsg = (req, res) => {
    res.send("This is a sample error message")
    logger.error("This is a sample error message from server")
}

module.exports = {infoMsg, warnMsg, errorMsg}