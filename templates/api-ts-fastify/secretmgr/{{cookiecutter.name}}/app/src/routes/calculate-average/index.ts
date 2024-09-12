'use strict'

import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

interface RequestBody {
  x: string;
  y: string;
}

const calculateAverageRoute = async (fastify: FastifyInstance) => {
  fastify.post('/', async (request: FastifyRequest<{ Body: RequestBody }>, reply: FastifyReply) => {
    const {
      body: { x, y }
    } = request
    const average = fastify.calculateAverage(Number(x), Number(y))
    const roundedAvg = average.toFixed(1)
    return { average: roundedAvg }
  })
}

export default calculateAverageRoute
