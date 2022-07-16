import { Card } from '@prisma/client';
import cardRepository from '../repositories/cardRepository.js';
import {
  unprocessableEntityError,
  notFoundError,
  unauthorizedError,
  conflictError,
} from '../middlewares/errorHandlerMiddleware.js';
import { decrypt } from '../utils/cryptUtils.js';

export type CreateCardData = Omit<Card, 'id' | 'createdAt'>;

async function create(newCard: CreateCardData) {
  await cardRepository.insert(newCard);
}

async function getById(userId: number, id: number) {
  if (!id) {
    const message = 'Invalid id !';
    throw unprocessableEntityError(message);
  }

  const card = await cardRepository.findById(id);

  if (!card) {
    const message = 'Card not found !';
    throw notFoundError(message);
  }

  if (card.userId !== userId) {
    const message = 'Unauthorized !';
    throw unauthorizedError(message);
  }

  card.password = decrypt(card.password);
  card.securityCode = decrypt(card.securityCode);

  return card;
}

async function getAll(userId: number) {
  const cards = await cardRepository.findAll(userId);
  return cards.map((credential) => ({
    ...credential,
    password: decrypt(credential.password),
    securityCode: decrypt(credential.securityCode),
  }));
}

async function validateTitle(newCard: CreateCardData) {
  const titleExists = await cardRepository.findByUserIdAndTitle(
    newCard.userId,
    newCard.title.toLowerCase()
  );

  if (titleExists) {
    const message = 'Card title already in use !';
    throw conflictError(message);
  }
}

async function remove(userId: number, id: number) {
  if (!id) {
    const message = 'Invalid id !';
    throw unprocessableEntityError(message);
  }

  const card = await cardRepository.findById(id);

  if (!card) {
    const message = 'Card not found !';
    throw notFoundError(message);
  }

  if (card.userId !== userId) {
    const message = 'Unauthorized !';
    throw unauthorizedError(message);
  }

  await cardRepository.remove(userId, id);
}

const cardService = {
  create,
  validateTitle,
  getAll,
  getById,
  remove,
};

export default cardService;
