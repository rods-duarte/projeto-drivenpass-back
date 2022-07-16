import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';
import { unauthorizedError } from '../middlewares/errorHandlerMiddleware.js';
import userRepository from '../repositories/userRepository.js';

export type LoginData = Omit<User, 'id' | 'createdAt'>;

async function validateCredentials({ email, password }: LoginData) {
  const user = await userRepository.findByEmail(email);
  const match = bcrypt.compare(user.password, password);

  if (!user || !match) {
    const message = 'Wrong email & password combination !';
    throw unauthorizedError(message);
  }
}

function createToken(id: number) {
  const config = { expiresIn: 60 * 60 * 24 }; // one day in seconds
  const token = jwt.sign({ userId: id }, process.env.SECRET_KEY, config);
  return token;
}

const authService = {
  createToken,
  validateCredentials,
};

export default authService;
