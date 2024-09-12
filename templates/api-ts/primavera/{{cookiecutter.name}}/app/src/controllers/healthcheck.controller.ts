/*
Kubernetes provides 3 different types of probes to automatically monitor and manage health
of a running container within a pod:
  Liveness Probe: used to check if a container is alive and healthy. 
  Readiness Probe: determines if a container is ready to accept a requests
  Startup Probe: only runs once to determine if the container started and is ready for requests.
*/

import type { Request, Response } from 'express';

const startup = (req: Request, res: Response): void => {
  res.status(200).send('ok');
};

const liveness = (req: Request, res: Response): void => {
  res.status(200).send('ok');
};

const readiness = (req: Request, res: Response): void => {
  res.status(200).send('ok');
};

export { startup, liveness, readiness };
