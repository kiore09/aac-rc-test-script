'use strict'

module.exports = async function (fastify, opts) {
  fastify.post('/', async function (request, reply) {
    try {
      const { key, value } = request.body;
      if (!key || !value) {
        throw new Error('Missing key or value');
      }

      const sanitizedKey = fastify.sanitizeInput(key);
      const sanitizedValue = fastify.sanitizeInput(value);

      if (!/^[a-zA-Z0-9-_]+$/.test(sanitizedKey) || !/^[a-zA-Z0-9-_]+$/.test(sanitizedValue)) {
        throw new Error('Invalid input');
      }

      const { redis } = fastify;
      request.server.log.info(`Connected to Redis`);

      const response = await redis.set(sanitizedKey, sanitizedValue);
      request.server.log.info(`Result from SET: ${response}`);

      return reply.view('memstore.ejs', { response, key: sanitizedKey });
    } catch (err) {
      request.server.log.error(`Error processing request: ${err.message}`);
      return reply.view('memstore.ejs', { response: null, error: err.message });
    }
  });

  fastify.get('/:key', async function (request, reply) {
    try {
      const { key } = request.params;
      const sanitizedKey = fastify.sanitizeInput(key);

      if (!/^[a-zA-Z0-9-_]+$/.test(sanitizedKey)) {
        throw new Error('Invalid input');
      }

      request.server.log.info(`Retrieve from Redis Connection`);

      const { redis } = fastify;

      const response = await redis.get(sanitizedKey);
      return reply.send(response);
    } catch (err) {
      request.server.log.error(`Error processing request: ${err.message}`);
      return reply.send({ error: err.message });
    }
  });

  fastify.get('/', async function (request, reply) {
    return reply.view('memstore.ejs', { response: null });
  });
}