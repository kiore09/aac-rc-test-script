// Modified based on https://gist.github.com/jordanebelanger/175417f1b61fa2c452fab0cdf3c53570
// Configuring pino to work with cloud logging

import pino, { LoggerOptions, BaseLogger } from 'pino';

interface Levels {
  trace: number;
  debug: number;
  info: number;
  warn: number;
  error: number;
  fatal: number;
}

const PINO_LEVELS: Levels = {
  trace: 10,
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  fatal: 60,
};

function pinoLevelToStackdriverSeverity(level: number): string {
  if (level === PINO_LEVELS.trace || level === PINO_LEVELS.debug) {
    return 'debug';
  }
  if (level === PINO_LEVELS.info) {
    return 'info';
  }
  if (level === PINO_LEVELS.warn) {
    return 'warning';
  }
  if (level === PINO_LEVELS.error) {
    return 'error';
  }
  if (level >= PINO_LEVELS.fatal) {
    return 'critical';
  }
  return 'default';
}

const options: LoggerOptions = {
  messageKey: 'message',
  timestamp: true,
  base: undefined,
  formatters: {
    level(_label, number) {
      return {
        severity: pinoLevelToStackdriverSeverity(number),
      };
    },
  },
  serializers: {
    req(request) { return undefined; },
    res(reply) { return undefined; },
    responseTime: function(value) { return undefined; }
  }
};

const logger: BaseLogger = pino(options);

export default logger;
