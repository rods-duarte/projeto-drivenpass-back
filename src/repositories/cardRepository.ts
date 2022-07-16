import client from '../config/database.js';
import { CreateCardData } from '../services/cardService.js';

async function insert(data: CreateCardData) {
  await client.card.create({
    data,
  });
}

async function findAll(userId: number) {
  const cards = await client.card.findMany({
    where: {
      userId,
    },
  });
  return cards;
}

async function findById(id: number) {
  const card = await client.card.findUnique({
    where: {
      id,
    },
  });
  return card;
}

async function findByUserIdAndTitle(userId: number, title: string) {
  const card = await client.card.findFirst({
    where: {
      userId,
      title: {
        mode: 'insensitive',
        equals: title,
      },
    },
  });
  return card;
}

async function remove(userId: number, id: number) {
  await client.card.deleteMany({
    where: {
      id,
      userId,
    },
  });
}

const cardRepository = {
  insert,
  findAll,
  findByUserIdAndTitle,
  findById,
  remove,
};

export default cardRepository;
