import express from 'express';
import { blobUploadView, uploadBlob } from '../controllers/gcstorage.controller';

const router = express.Router();

router
  .get('/storage', blobUploadView)
  .post('/upload', uploadBlob);

export default router;
