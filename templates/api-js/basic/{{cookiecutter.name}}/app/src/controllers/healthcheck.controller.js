/*
Kubernetes provides 3 different types of probes to automatically monitor and manage health
of a running container within a pod:
  Liveness Probe: used to check if a container is alive and healthy. 
  Readiness Probe: determines if a container is ready to accept a requests
  Startup Probe: only runs once to determine if the container started and is ready for requests.
*/

const startup = (req, res) => {
  res.status(200).send('ok');
};

const liveness = (req, res) => {
  res.status(200).send('ok');
};

const readiness = (req, res) => {
  res.status(200).send('ok');
};

module.exports = {startup, liveness, readiness};
