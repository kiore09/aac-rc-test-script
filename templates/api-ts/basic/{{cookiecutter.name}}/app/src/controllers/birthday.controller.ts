/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 24-05-2024
Description: Controller-- advice for modifying the returned JSON generated
when serializing the BirthdayMessage.
===========================================================================
*/

import type { Request, Response, NextFunction } from 'express';
import { payloadHandler, type Payload } from '../middlewares/validate';
import calculateDateDiff from '../utils/calculateDateDiff';

const birthday = (req: Request, res: Response): void => {
  res.render('birthday');
};

const getBirthDay = (req: Request, res: Response, next: NextFunction): void => {
  const {
    body: { name, birthMonth, birthDay }
  } = req;

  const remainingDays = calculateDateDiff(Number(birthMonth), Number(birthDay));

  const payloadData: Payload = { name: name, days: remainingDays };
  
  payloadHandler(req, res, next, {name: name, days: remainingDays} )
}
 
export { getBirthDay, birthday };
