'use strict'

module.exports = async function (fastify, opts) {
  fastify.post('/', async function (request, reply) {
    const {
      body: { x, y }
    } = request
    const average = fastify.calculateAverage(Number(x), Number(y))
    const roundedAvg = average.toFixed(1)
    return { average: roundedAvg }
  })
}
