import { User } from '@prisma/client';
import { unauthorizedError } from '../middlewares/errorHandlerMiddleware.js';
import userRepository from '../repositories/userRepository.js';

export type CreateUserData = Omit<User, 'id' | 'createdAt'>;

async function create(newUser: CreateUserData) {
  await userRepository.insert(newUser);
}

async function getByEmail(email: string) {
  const user = await userRepository.findByEmail(email);

  if (!user) {
    const message = 'Wrong email & password combination !';
    throw unauthorizedError(message);
  }

  return user;
}

const userService = {
  create,
  getByEmail,
};

export default userService;
