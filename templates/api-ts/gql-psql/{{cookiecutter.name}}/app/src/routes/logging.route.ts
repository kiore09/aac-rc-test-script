import express, { type Router } from 'express';
import { infoMsg, warnMsg, errorMsg } from '../controllers/logging.controller';

const router: Router = express.Router();

router
    .get('/infoMsg', infoMsg)
    .get('/warnMsg', warnMsg)
    .get('/errorMsg', errorMsg);

export default router;
