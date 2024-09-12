import express from 'express';
import {pubSub, tryPubSub} from '../controllers/pubsub.controller';

const router = express.Router();

router
    .get('/', pubSub)
    .get('/pubsub', tryPubSub);

export default router;
