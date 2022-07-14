import { Request, Response } from 'express';
import authService, { CreateUserData } from '../services/authService.js';

export async function login(req: Request, res: Response) {} //eslint-disable-line

export async function register(req: Request, res: Response) {
  const { email, password }: CreateUserData = req.body;
  const cryptedPassword = authService.encrypt(password);
  console.log(
    '🚀 ~ file: authController.ts ~ line 9 ~ register ~ cryptedPassword',
    cryptedPassword
  );

  await authService.create({ email, password: cryptedPassword });
  res.status(201).send('User created successfully !');
}
