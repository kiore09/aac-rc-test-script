'use strict'

import tap from 'tap';
import fastify from 'fastify';
import loggingPlugin from '../../routes/logging';

let server;

tap.beforeEach(() => {
  server = fastify();
  server.register(loggingPlugin);
});

tap.test('GET `/infoMsg` route', async (t) => {
  const response = await server.inject({
    method: 'GET',
    url: '/infoMsg',
  });

  const expected = 'This is a sample info message';

  t.equal(response.statusCode, 200, 'returns status code of 200');
  t.equal(response.body, expected);
});

tap.test('GET `/warnMsg` route', async (t) => {
  const response = await server.inject({
    method: 'GET',
    url: '/warnMsg',
  });

  const expected = 'This is a sample warn message';

  t.equal(response.statusCode, 200, 'returns status code of 200');
  t.equal(response.body, expected);
});

tap.test('GET `/errorMsg` route', async (t) => {
  const response = await server.inject({
    method: 'GET',
    url: '/errorMsg',
  });

  const expected = 'This is a sample error message';

  t.equal(response.statusCode, 200, 'returns status code of 200');
  t.equal(response.body, expected);
});
