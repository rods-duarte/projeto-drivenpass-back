import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import userRepository from '../repositories/userRepository.js';

export type CreateUserData = Omit<User, 'id' | 'createdAt'>;

async function create(newUser: CreateUserData) {
  await userRepository.create(newUser);
}

function encrypt(text: string) {
  const salt = Number(process.env.SALT);
  const crypted = bcrypt.hashSync(text, salt) || null;

  return crypted;
}

const authService = {
  create,
  encrypt,
};

export default authService;
