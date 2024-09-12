import express, { type Router } from 'express';
import { helloWorld, infoMsg, warnMsg, errorMsg } from '../controllers/logging.controller';

const router: Router = express.Router();

router
    .get('/', helloWorld)
    .get('/infoMsg', infoMsg)
    .get('/warnMsg', warnMsg)
    .get('/errorMsg', errorMsg);

export default router;
