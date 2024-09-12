import tap from 'tap';
import Fastify from 'fastify';
import routes from '../../routes/secret-manager';
import sinon from 'sinon';
import * as secretManager from '../../controllers/secret-manager';

let fastify;
let getSecretPageStub;
let getSecretValueStub;

tap.beforeEach(() => {
  fastify = Fastify();
  fastify.register(routes);

  getSecretPageStub = sinon.stub(secretManager, 'getSecretPage');
  getSecretPageStub.callsFake((request, reply) => reply.send({ message: 'getSecretPage stubbed' }));

  getSecretValueStub = sinon.stub(secretManager, 'getSecretValue');
  getSecretValueStub.callsFake((request, reply) => reply.send({ message: 'getSecretValue stubbed' }));
});

tap.afterEach(() => {
  getSecretPageStub.restore();
  getSecretValueStub.restore();
});

tap.test('GET /secret-manager', async (t) => {
  // route '/secret-manager' is derived from folder structure
  const response = await fastify.inject({
    method: 'GET',
    url: '/'
  });

  t.equal(response.statusCode, 200);
  t.same(JSON.parse(response.body), { message: 'getSecretPage stubbed' });
});

tap.test('POST /secret-manager/value', async (t) => {
  // route '/secret-manager/value' is derived from folder structure
  const response = await fastify.inject({
    method: 'POST',
    url: '/value'
  });

  t.equal(response.statusCode, 200);
  t.same(JSON.parse(response.body), { message: 'getSecretValue stubbed' });
});
