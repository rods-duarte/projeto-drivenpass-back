import client from '../config/database.js';
import {
  CreateSessionData,
  UpdateSessionData,
} from '../services/sessionService.js';

async function findByUserId(userId: number) {
  const session = await client.session.findFirst({
    where: {
      userId,
      valid: true,
    },
  });
  return session;
}

async function findByToken(token: string) {
  const session = await client.session.findUnique({
    where: {
      token,
    },
  });
  return session;
}

async function insert(data: CreateSessionData) {
  await client.session.create({
    data,
  });
}

async function update(id: number, data: UpdateSessionData) {
  await client.session.updateMany({
    where: {
      id,
      valid: true,
    },
    data,
  });
}

const sessionRepository = {
  insert,
  findByUserId,
  findByToken,
  update,
};

export default sessionRepository;
