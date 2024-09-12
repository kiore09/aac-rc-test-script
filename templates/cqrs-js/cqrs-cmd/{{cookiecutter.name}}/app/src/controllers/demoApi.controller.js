/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 27-12-2022
Description: Sample API controller demonstrating the use of Swagger
annotations for generating an OpenAPI specification doc. The API doc is
generated when running the npm run docs command.
===========================================================================
*/

const User = require('../models/user');

function usersList() {
    let list = [];
    for(let i = 1; i<= 5; i++) {
      list.push(new User(i, `user-${i}`, `tester-${i}`));
    }
    return list;
}

const data = usersList();

const getUsers = (req, res) => {
    const users = data;
    console.log(users)
    res.status(200).json(users)
}

const getUserById = (req, res) => {
    const  userId  = req.params.userId;

    usersList().find( user => {
        if (user.userId == userId) {
            res.status(200).json(user);
        }
    })
}

module.exports = {getUsers, getUserById}