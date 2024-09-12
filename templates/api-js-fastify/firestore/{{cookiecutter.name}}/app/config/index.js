require('dotenv').config({
    override: true
})
const env = process.env.NODE_ENV || 'default';
console.log(`${env}`);
const config = require(`./${env}`);

config.env = env;

module.exports = Object.freeze({ ...config });