/*
Kubernetes provides 3 different types of probes to automatically monitor and manage health
of a running container within a pod:
  Liveness Probe: used to check if a container is alive and healthy. 
  Readiness Probe: determines if a container is ready to accept a requests
  Startup Probe: only runs once to determine if the container started and is ready for requests.
*/

const startup = async (request, reply) => {
    return reply.status(200).send('ok');
  };
  
const liveness = async (request, reply) => {
    return reply.status(200).send('ok');
  };
  
const readiness = async  (request, reply) => {
    return reply.status(200).send('ok');
  };
  
  module.exports = {startup, liveness, readiness};