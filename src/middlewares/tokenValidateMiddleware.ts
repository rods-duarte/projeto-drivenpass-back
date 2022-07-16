import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import sessionRepository from '../repositories/sessionRepository.js';
import authService from '../services/authService.js';
import sessionService from '../services/sessionService.js';
import { unauthorizedError } from './errorHandlerMiddleware.js';

interface JwtPayload {
  userId: number;
  iat: number;
  exp: number;
}

export default async function validateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers?.authorization.replace('Bearer ', '').trim();
  const session = await sessionRepository.findByToken(token);

  if (!session) {
    const message = 'Invalid token !';
    throw unauthorizedError(message);
  }

  try {
    const data = jwt.verify(token, process.env.SECRET_KEY) as JwtPayload;

    const newToken = authService.createToken(data.userId);
    await sessionRepository.update(session.id, { token: newToken });
    res.locals.userId = data.userId;
    res.locals.token = newToken;

    next();
  } catch (err) {
    await sessionService.close(session);
    const message = 'Session expired !';
    throw unauthorizedError(message);
  }
}
