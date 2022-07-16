import client from '../config/database.js';
import { CreateNoteData } from '../services/noteService.js';

async function insert(data: CreateNoteData) {
  await client.note.create({
    data,
  });
}

async function findAll(userId: number) {
  const notes = await client.note.findMany({
    where: {
      userId,
    },
  });
  return notes;
}

async function findById(id: number) {
  const note = await client.note.findUnique({
    where: {
      id,
    },
  });
  return note;
}

async function findByUserIdAndTitle(userId: number, title: string) {
  const note = await client.note.findFirst({
    where: {
      userId,
      title: {
        mode: 'insensitive',
        equals: title,
      },
    },
  });
  return note;
}

async function remove(userId: number, id: number) {
  await client.note.deleteMany({
    where: {
      id,
      userId,
    },
  });
}

const noteRepository = {
  insert,
  findAll,
  findByUserIdAndTitle,
  findById,
  remove,
};

export default noteRepository;
