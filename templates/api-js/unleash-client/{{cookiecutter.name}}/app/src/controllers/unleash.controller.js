const logger = require('../utils/sample.logger');
const config = require('../../config');

const error = '';
const toggleName = config.unleash_flag_name;

const index = (req, res) => {
  res.render('index');
};

const unleashFlags = async (req, res) => {
  try {
    // Checking if a toggle is enabled
    let toggle = "unknown";
    if (req.app.get('unleash').isEnabled(toggleName)) {
      logger.info(`${toggleName} is enabled`);
      toggle = true;
    } else {
      logger.info(`${toggleName} is disabled`);
      toggle = false;
    }

    // Getting current timestamp to display alongside toggle status
    let now = new Date(Date.now()).toISOString();
    res.render('unleash', {toggleName: toggleName, toggle: toggle, time: now});
  } catch (err) {
    res.render('unleash', { error: err.message, toggleName: toggleName, toggle: toggle, time: now });
    logger.error(`An error occurred: ${err.message}`);
  }
};

module.exports = {index, unleashFlags};
