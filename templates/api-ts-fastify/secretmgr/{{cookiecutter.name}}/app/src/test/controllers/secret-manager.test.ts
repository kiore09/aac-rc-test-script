import tap from 'tap';
import sinon from 'sinon';
import { SecretManagerServiceClient } from '@google-cloud/secret-manager';
import * as stringMaskModule from '../../utils/stringMask';
import { getSecretPage, getSecretValue } from '../../controllers/secret-manager';

const secretManagerServiceClientStub = sinon.stub(SecretManagerServiceClient.prototype, 'accessSecretVersion');
secretManagerServiceClientStub.returns([{ payload: { data: Buffer.from('secret') } }]);

const stringMaskStub = sinon.stub(stringMaskModule, 'default');
stringMaskStub.returns('masked-secret');

tap.test('getSecretPage', async (t) => {
  const request = { secretValue: 'test-secret-value' } as any;
  const reply = { view: (view: string, data: any) => {
    t.equal(view, 'secret.ejs');
    console.log('data is', data.secretValue)
    t.same(data.secretValue, 'test-secret-value');
    return reply;
  } } as any;

  await getSecretPage(request, reply);
});

tap.test('getSecretValue', async (t) => {
  const request = { } as any;
  const reply = { view: (view: string, data: any) => { 
    t.equal(view, 'secret.ejs');
    t.same(data.secretValue, 'masked-secret');
    return reply;
  } } as any;

  await getSecretValue(request, reply);
});

