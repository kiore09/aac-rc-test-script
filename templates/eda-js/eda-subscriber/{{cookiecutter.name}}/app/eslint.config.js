const googleConfig = require("eslint-config-google"); // import the config
const jsdoc = require("eslint-plugin-jsdoc"); // import the plugin

module.exports = [
  googleConfig,  //declare google config as an item
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        document: "readonly",
        window: "readonly",
        commonjs: "readonly",
        es2021: "readonly"
      }
    },
    plugins: { jsdoc },
    rules: {
      "new-cap": "off",
      "max-len": "off",
      "valid-jsdoc": "off",
      "require-jsdoc": "off"
    }
  }
];