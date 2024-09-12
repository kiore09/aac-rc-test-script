const express = require('express');
const router = express.Router();
const birthdayController = require('../controllers/birthday.controller');
const {  fieldsRequired, isNumberValidation } = require('../middlewares/validate');

router
    .get('/birthDay', birthdayController.birthday)
    .post('/birthday/form', [ fieldsRequired, isNumberValidation ], birthdayController.getBirthDay);

module.exports = router;