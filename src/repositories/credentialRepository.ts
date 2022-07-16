import client from '../config/database.js';
import { CreateCredentialData } from '../services/credentialService.js';

async function insert(data: CreateCredentialData) {
  await client.credential.create({
    data,
  });
}

async function findAll(userId: number) {
  const credentials = await client.credential.findMany({
    where: {
      userId,
    },
  });
  return credentials;
}

async function findById(id: number) {
  const credential = await client.credential.findUnique({
    where: {
      id,
    },
  });
  return credential;
}

async function findByUserIdAndTitle(userId: number, title: string) {
  const credential = await client.credential.findFirst({
    where: {
      userId,
      title: {
        mode: 'insensitive',
        equals: title,
      },
    },
  });
  return credential;
}

async function remove(userId: number, id: number) {
  await client.credential.deleteMany({
    where: {
      id,
      userId,
    },
  });
}

const credentialRepository = {
  insert,
  findAll,
  findByUserIdAndTitle,
  findById,
  remove,
};

export default credentialRepository;
