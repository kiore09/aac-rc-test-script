/*
Kubernetes provides 3 different types of probes to automatically monitor and manage health
of a running container within a pod:
  Liveness Probe: used to check if a container is alive and healthy. 
  Readiness Probe: determines if a container is ready to accept a requests
  Startup Probe: only runs once to determine if the container started and is ready for requests.
*/

import type { FastifyReply, FastifyRequest } from 'fastify';

const startup = async (request: FastifyRequest, reply: FastifyReply) => {
  return reply.status(200).send('ok');
};

const liveness = async (request: FastifyRequest, reply: FastifyReply) => {
  return reply.status(200).send('ok');
};

const readiness = async (request: FastifyRequest, reply: FastifyReply) => {
  return reply.status(200).send('ok');
};

export { startup, liveness, readiness };
