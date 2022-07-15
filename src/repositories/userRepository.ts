import client from '../config/database.js';
import { CreateUserData } from '../services/userService.js';

async function insert(data: CreateUserData) {
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
  insert,
};

export default userRepository;
