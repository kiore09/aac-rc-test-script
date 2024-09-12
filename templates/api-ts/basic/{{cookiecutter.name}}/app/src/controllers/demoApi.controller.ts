/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 24-05-2024
Description: Sample API controller demonstrating the use of Swagger
annotations for generating an OpenAPI specification doc. The API doc is
generated when running the npm run docs command.
===========================================================================
*/

import User from '../models/user';
import type { Request, Response } from 'express';

function usersList(): User[] {
  const list: User[] = [];
  for (let i = 1; i <= 5; i++) {
    list.push(new User(i, `user-${i}`, `tester-${i}`));
  }
  return list;
}

const data: User[] = usersList();

const getUsers = (req: Request, res: Response): void => {
  const users: User[] = data;
  console.log(users);
  res.status(200).json(users);
};

const getUserById = (req: Request, res: Response): void => {
  const userId: number = parseInt(req.params.userId);

  const userFound: User | undefined = usersList().find((user) => user.userId === userId);
  if (userFound) {
    res.status(200).json(userFound);
    return
  }
  res.status(404).json("User not found");
  return
};

export default { getUsers, getUserById };
