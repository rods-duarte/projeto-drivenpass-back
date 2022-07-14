import { NextFunction, Request, Response } from 'express';

import userRepository from '../repositories/userRepository.js';
import { conflictError } from './errorHandlerMiddleware.js';

export default async function validateUniqueEmail(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email }: { email: string } = req.body;
  const user = await userRepository.findByEmail(email);

  if (user) {
    const message = 'Email already registered !';
    throw conflictError(message);
  }
  next();
}
