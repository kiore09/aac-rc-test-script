import express from 'express';
import { homeView, testPostgres } from '../controllers/postgresql.controller';

const router = express.Router();

router
  .get('/', homeView)
  .get('/postgresql', testPostgres);

export default router;