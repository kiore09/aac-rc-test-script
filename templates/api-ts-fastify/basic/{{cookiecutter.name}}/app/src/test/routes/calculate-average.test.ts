'use strict'

import tap from 'tap';
import fastify from 'fastify';
import calculateAverageRoute from '../../routes/calculate-average';

tap.test('POST `/calculate-average` route', async (t) => {
  const server = fastify();

  server.register(calculateAverageRoute);

  server.decorate('calculateAverage', (x: number, y: number) => {
    return (x + y) / 2;
  });

   // route '/calculate-average' is derived from folder structure
   const response = await server.inject({
    method: 'POST',
    url: '/',
    payload: {
      x: '10',
      y: '20',
    },
  });

  const expected = { average: '15.0' };
  const receivedData = JSON.parse(response.payload);

  t.equal(response.statusCode, 200, 'returns status code of 200');
  t.same(receivedData, expected);
});
