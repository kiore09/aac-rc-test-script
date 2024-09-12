import express, { type Router } from 'express';
import { getBirthDay, birthday } from '../controllers/birthday.controller';
import { fieldsRequired, isNumberValidation } from '../middlewares/validate';

const router: Router = express.Router();

router
  .get('/birthDay', birthday)
  .post('/birthday/form', [ fieldsRequired, isNumberValidation ], getBirthDay);

export default router;
