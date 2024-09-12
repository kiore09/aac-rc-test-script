'use strict'

const { test } = require('tap')
const sumTwoNumbers = require('../../utils/sumTwoNumbers')

test('sumTwoNumbers', async ({ test }) => {
  test('returns the sum of two numbers', async t => {
    const expected = 3
    t.equal(sumTwoNumbers(1, 2), expected)
  })

  test('throws an error when arguments are not numbers', async t => {
    t.throws(
      () => sumTwoNumbers('a', 'b'),
      new TypeError('Arguments must be number')
    )
  })
})
