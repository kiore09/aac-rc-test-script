import express from 'express';
import { gqlHomeView, requestQueryView, requestQuery } from '../controllers/gqlclient.controller';

const router = express.Router();

router
    .get('/', gqlHomeView)
    .get('/graphqlclient', requestQueryView)
    .post('/requestQuery', requestQuery);

export default router;