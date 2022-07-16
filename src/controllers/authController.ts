import { User } from '@prisma/client';
import { Request, Response } from 'express';
import authService from '../services/authService.js';
import userService, { CreateUserData } from '../services/userService.js';

export async function login(req: Request, res: Response) {
  const user: User = res.locals.user;
  const token = authService.createToken(user.id);

  res.status(200).send({ token });
} //eslint-disable-line

export async function register(req: Request, res: Response) {
  const { email, password }: CreateUserData = req.body;
  const cryptedPassword = authService.createHash(password);

  await userService.create({ email, password: cryptedPassword });
  res.status(201).send('User created successfully !');
}
