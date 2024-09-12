import express, { Request, Response, Router } from 'express';
import { homeView, secretView, getSecretValue } from '../controllers/secretmgr.controller';

const router: Router = express.Router();

router
    .get('/', (req: Request, res: Response) => homeView(req, res))
    .get('/secret', (req: Request, res: Response) => secretView(req, res))
    .post('/secret/value', (req: Request, res: Response) => getSecretValue(req, res));

export default router;
