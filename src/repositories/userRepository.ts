import client from '../config/database.js';
import { CreateUserData } from '../services/authService.js';

async function create(data: CreateUserData) {
  await client.user.create({
    data,
  });
}

async function findByEmail(email: string) {
  const user = await client.user.findUnique({ where: { email } });
  return user;
}

const userRepository = {
  findByEmail,
  create,
};

export default userRepository;
