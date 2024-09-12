'use strict'

const { test } = require('tap')
const { build, mockSecretEnv } = require('../helper')

test('/secret-manager', async (t) => {
    const { test } = t
    const app = await build(t)

    test('route: /secret-manager', async t => {
        const { statusCode, payload } = await app.inject({
          url: '/secret-manager'
        })
        t.equal(statusCode, 200)
        t.ok(payload)
      })
      
      test('route: POST /secret-manager/validate with valid secrewt', async t => {
        const expectedResult = 'true'
      
        const res = await app.inject({
          method: 'POST',
          url: '/secret-manager/validate',
          payload: {
            secretName: mockSecretEnv.mockSecretName,
            secretValue: mockSecretEnv.mockSecretValue,
          }
        })

        t.equal(res.statusCode, 302)
        t.ok(res.headers.location.includes(expectedResult))
      })

      test('route: POST /secret-manager/validate with invalid secret', async t => {
        const res = await app.inject({
          method: 'POST',
          url: '/secret-manager/validate',
          payload: {
            secretName: mockSecretEnv.mockSecretName,
            secretValue: 'incorrect value',
          }
        })
      
        t.equal(res.statusCode, 302)
        t.notOk(res.headers.location.includes('true'))
      })
  })
  