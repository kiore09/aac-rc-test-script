import dotenv from 'dotenv';
dotenv.config({
    override: true
});

const env: string = process.env.NODE_ENV || 'default';
console.log(`${env}`);
const config = require(`./${env}`);

config.default.env = env;

export default Object.freeze({ ...config.default });