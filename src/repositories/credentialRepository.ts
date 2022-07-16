import client from '../config/database.js';
import { CreateCredentialData } from '../services/credentialService.js';

async function insert(data: CreateCredentialData) {
  await client.credential.create({
    data,
  });
}

async function findByUserIdAndTitle(userId: number, title: string) {
  const credential = await client.credential.findFirst({
    where: {
      userId,
      title,
    },
  });
  return credential;
}

const credentialRepository = {
  insert,
  findByUserIdAndTitle,
};

export default credentialRepository;
