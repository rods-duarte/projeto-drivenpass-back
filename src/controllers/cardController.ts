import { Request, Response } from 'express';
import { crypt } from '../utils/cryptUtils.js';
import cardService, { CreateCardData } from '../services/cardService.js';

export async function newCard(req: Request, res: Response) {
  const { body } = req;
  body.password = crypt(body.password);
  body.securityCode = crypt(body.securityCode);
  const userId: number = res.locals.userId;

  const card: CreateCardData = { ...body, userId };
  await cardService.validateTitle(card);

  await cardService.create(card);
  res.status(200).send('Success');
}

export async function returnCard(req: Request, res: Response) {
  const id = +req.params.id;
  const userId = +res.locals.userId;

  const card = await cardService.getById(userId, id);
  res.status(200).send({ data: card });
}

export async function returnCards(req: Request, res: Response) {
  const userId = +res.locals.userId;

  const cards = await cardService.getAll(userId);
  res.status(200).send({ data: cards });
}

export async function deleteCard(req: Request, res: Response) {
  const id = +req.params.id;
  const userId = +res.locals.userId;

  await cardService.remove(userId, id);
  res.status(200).send('Success');
}
