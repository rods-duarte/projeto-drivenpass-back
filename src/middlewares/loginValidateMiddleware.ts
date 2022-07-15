import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import userRepository from '../repositories/userRepository.js';
import { LoginData } from '../services/authService.js';
import { unauthorizedError } from './errorHandlerMiddleware.js';

export default async function validateCredentials(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, password }: LoginData = req.body;
  const user = await userRepository.findByEmail(email);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    const message = 'Wrong email & password combination !';
    throw unauthorizedError(message);
  }

  res.locals.user = user;
  next();
}
