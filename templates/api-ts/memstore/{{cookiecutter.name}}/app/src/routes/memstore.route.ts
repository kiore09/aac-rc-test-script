import { Router } from 'express';
import { memstore, redisData } from '../controllers/memstore.controller';

const router = Router();

router
  .get('/memstore', memstore)
  .post('/memstore/create', redisData);

export default router;
