import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';
import Cryptr from 'cryptr';
import { unauthorizedError } from '../middlewares/errorHandlerMiddleware.js';
import userRepository from '../repositories/userRepository.js';

export type LoginData = Omit<User, 'id' | 'createdAt'>;

function createHash(text: string) {
  const salt = Number(process.env.SALT);
  const crypted = bcrypt.hashSync(text, salt) || null;

  return crypted;
}

function crypt(text: string) {
  const cryptr = new Cryptr(process.env.SECRET_KEY);
  const encrypted = cryptr.encrypt(text);
  return encrypted;
}

function decrypt(text: string) {
  const cryptr = new Cryptr(process.env.SECRET_KEY);
  const decrypted = cryptr.decrypt(text);
  return decrypted;
}

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
  createHash,
  createToken,
  validateCredentials,
  crypt,
  decrypt,
};

export default authService;
