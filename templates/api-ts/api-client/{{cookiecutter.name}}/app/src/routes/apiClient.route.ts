import express, { type Router } from 'express';
import { homeView, emailView, sendEmails } from '../controllers/apiClient.controller';
import multer, { Multer } from 'multer';
const upload: Multer = multer({ storage: multer.memoryStorage() });
const router: Router = express.Router();

router
    .get('/', homeView)
    .get('/send', emailView)
    .post('/send/Emails', upload.array('attachment'), sendEmails);

export default router;
