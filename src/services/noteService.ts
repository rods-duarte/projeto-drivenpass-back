import { Note } from '@prisma/client';
import {
  unprocessableEntityError,
  notFoundError,
  unauthorizedError,
  conflictError,
} from '../middlewares/errorHandlerMiddleware.js';
import noteRepository from '../repositories/noteRepository.js';

export type CreateNoteData = Omit<Note, 'id' | 'createdAt'>;

async function create(newNote: CreateNoteData) {
  await noteRepository.insert(newNote);
}

async function getById(userId: number, id: number) {
  if (!id) {
    const message = 'Invalid id !';
    throw unprocessableEntityError(message);
  }

  const note = await noteRepository.findById(id);

  if (!note) {
    const message = 'Note not found !';
    throw notFoundError(message);
  }

  if (note.userId !== userId) {
    const message = 'Unauthorized !';
    throw unauthorizedError(message);
  }

  return note;
}

async function getAll(userId: number) {
  const notes = await noteRepository.findAll(userId);
  return notes;
}

async function validateTitle(newNote: CreateNoteData) {
  const titleExists = await noteRepository.findByUserIdAndTitle(
    newNote.userId,
    newNote.title.toLowerCase()
  );

  if (titleExists) {
    const message = 'Note title already in use !';
    throw conflictError(message);
  }
}

async function remove(userId: number, id: number) {
  if (!id) {
    const message = 'Invalid id !';
    throw unprocessableEntityError(message);
  }

  const note = await noteRepository.findById(id);

  if (!note) {
    const message = 'Note not found !';
    throw notFoundError(message);
  }

  if (note.userId !== userId) {
    const message = 'Unauthorized !';
    throw unauthorizedError(message);
  }

  await noteRepository.remove(userId, id);
}

const noteService = {
  create,
  validateTitle,
  getAll,
  getById,
  remove,
};

export default noteService;
