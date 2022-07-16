import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
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

  try {
    const data = jwt.verify(token, process.env.SECRET_KEY) as JwtPayload;
    res.locals.userId = data.userId;
  } catch (err) {
    const message = 'Invalid Token !';
    throw unauthorizedError(message);
  }

  next();
}
