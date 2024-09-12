import express from 'express';
import firestoreController from '../controllers/firestore.controller';

const router = express.Router();

router.get('/firestore/read', firestoreController.getDocuments);

export default router;
