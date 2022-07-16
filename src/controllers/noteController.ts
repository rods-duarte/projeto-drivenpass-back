import { Request, Response } from 'express';
import noteService, { CreateNoteData } from '../services/noteService.js';

export async function newNote(req: Request, res: Response) {
  const { body } = req;
  const userId: number = res.locals.userId;

  const note: CreateNoteData = { ...body, userId };
  await noteService.validateTitle(note);

  await noteService.create(note);
  res.status(200).send('Success');
}

export async function returnNote(req: Request, res: Response) {
  const id = +req.params.id;
  const userId = +res.locals.userId;

  const note = await noteService.getById(userId, id);
  res.status(200).send({ data: note });
}

export async function returnNotes(req: Request, res: Response) {
  const userId = +res.locals.userId;

  const notes = await noteService.getAll(userId);
  res.status(200).send({ data: notes });
}

export async function deleteNote(req: Request, res: Response) {
  const id = +req.params.id;
  const userId = +res.locals.userId;

  await noteService.remove(userId, id);
  res.status(200).send('Success');
}
