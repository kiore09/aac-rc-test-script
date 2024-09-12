/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 23-12-2022
Description: Controller advice for modifying the returned JSON generated
when serializing the BirthdayMessage.
===========================================================================
*/

const { payload } = require('../middlewares/validate');
const dateDiff = require('../utils/calculateDateDiff');

const birthday = (req, res) => {
    res.render('birthday');
  };

const getBirthDay = (req, res, next) => {
  const {
    body: { name, birthMonth, birthDay }
  } = req
  const remainingDays = dateDiff.calculateDateDiff(Number(birthMonth), Number(birthDay));
  
  payload(req, res, next,{name: name, days: remainingDays} )
}
 
module.exports = { getBirthDay, birthday };