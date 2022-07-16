import { Credential } from '@prisma/client';
import { conflictError } from '../middlewares/errorHandlerMiddleware.js';
import credentialRepository from '../repositories/credentialRepository.js';

export type CreateCredentialData = Omit<Credential, 'id' | 'createdAt'>;

async function create(newCredential: CreateCredentialData) {
  await credentialRepository.insert(newCredential);
}

async function validateTitle(newCredential: CreateCredentialData) {
  const titleExists = await credentialRepository.findByUserIdAndTitle(
    newCredential.userId,
    newCredential.title
  );

  if (titleExists) {
    const message = 'Credential title already in use !';
    throw conflictError(message);
  }
}

const credentialService = {
  create,
  validateTitle,
};

export default credentialService;
