import { Credential } from '@prisma/client';
import {
  conflictError,
  notFoundError,
  unauthorizedError,
} from '../middlewares/errorHandlerMiddleware.js';
import credentialRepository from '../repositories/credentialRepository.js';
import authService from './authService.js';

export type CreateCredentialData = Omit<Credential, 'id' | 'createdAt'>;

async function create(newCredential: CreateCredentialData) {
  await credentialRepository.insert(newCredential);
}

async function getById(userId: number, id: number) {
  const credential = await credentialRepository.findById(id);

  if (!credential) {
    const message = 'Credential not found !';
    throw notFoundError(message);
  }

  if (credential.userId !== userId) {
    const message = 'Unauthorized !';
    throw unauthorizedError(message);
  }

  credential.password = authService.decrypt(credential.password);

  return credential;
}

async function getAll(userId: number) {
  const credentials = await credentialRepository.findAll(userId);
  return credentials.map((credential) => ({
    ...credential,
    password: authService.decrypt(credential.password),
  }));
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
  getAll,
  getById,
};

export default credentialService;
