require('dotenv').config()
const env = process.env.NODE_ENV || 'default';
console.log(process.env.NODE_ENV);
const config = require(`./${env}`);

config.env = env;

module.exports = Object.freeze({ ...config });