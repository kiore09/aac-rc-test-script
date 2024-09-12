import express, { Router } from 'express';
import * as tokenParsingController from '../controllers/tokenParsing.controller';

const router: Router = express.Router();

router
    .get('/', tokenParsingController.homeView)
    .get('/names', tokenParsingController.namesView);

export default router;