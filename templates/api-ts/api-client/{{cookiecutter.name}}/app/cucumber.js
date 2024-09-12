/**
 * Cucumber cannot interpret ".steps.ts" files by itself. This file configures
 * cucumber to include "ts-node/register" module so that it may interpret
 * TypeScript during BDD tests.
 */

module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: ['src/tests/features/*.ts']
  }
};