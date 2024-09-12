import express, { type Router } from 'express';
import { startup, liveness, readiness } from '../controllers/healthcheck.controller';

const router: Router = express.Router();

router
    .get('/startup', startup)
    .get('/liveness', liveness)
    .get('/readiness', readiness);

export default router;
