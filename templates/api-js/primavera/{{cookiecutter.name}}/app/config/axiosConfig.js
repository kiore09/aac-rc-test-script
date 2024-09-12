const axios = require('axios');
const https = require('https');

const httpsAgent = new https.Agent({
  rejectUnauthorized: false, // NOTE: Settings this to true will require Certificate validation
  simple: false,
  resolveWithFullResponse: true
});

const axiosConfig = () => {
  axios.defaults = {
    timeout: 90000,
    proxy: false,
    maxContentLength: 104857600,
    maxBodyLength: 104857600,
    headers: {
    },
    httpsAgent
  };
};

module.exports = axiosConfig;
