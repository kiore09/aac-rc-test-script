// Modified based on https://gist.github.com/jordanebelanger/175417f1b61fa2c452fab0cdf3c53570
// Configuring pino to work with cloud logging

const P = require('pino')

const PINO_LEVELS =  {
  trace: 10,
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  fatal: 60,
}

function pinoLevelToStackdriverSeverity(level) {
  if (level === PINO_LEVELS.trace || level === PINO_LEVELS.debug) {
    return 'debug'
  }
  if (level === PINO_LEVELS.info) {
    return 'info'
  }
  if (level === PINO_LEVELS.warn) {
    return 'warning'
  }
  if (level === PINO_LEVELS.error) {
    return 'error'
  }
  if (level >= PINO_LEVELS.fatal) {
    return 'critical'
  }
  return 'default'
}

const logger = P({
  messageKey: 'message',
  timestamp: true,
  base: undefined,
  
  formatters: {
    level(_label, number) {
      return {
        severity: pinoLevelToStackdriverSeverity(number),
      }
    },
  },
  serializers: {
    // Nullifying the standard Fastify Request/Response serializer for better stackdriver support
    req(request) { return undefined },
    res(reply) { return undefined },
    responseTime: function(value) { return undefined }
  }
})

module.exports = logger