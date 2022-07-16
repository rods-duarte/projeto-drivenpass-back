import { Request, Response } from 'express';
import { unprocessableEntityError } from '../middlewares/errorHandlerMiddleware.js';
import authService from '../services/authService.js';
import credentialService, {
  CreateCredentialData,
} from '../services/credentialService.js';

export async function newCredential(req: Request, res: Response) {
  const { body } = req;
  body.password = authService.crypt(body.password);
  const userId: number = res.locals.userId;
  const token: string = res.locals.token;

  const credential: CreateCredentialData = { ...body, userId };
  await credentialService.validateTitle(credential);

  await credentialService.create(credential);
  res.status(200).send({ token });
}

export async function returnCredential(req: Request, res: Response) {
  const id = +req.params.id;
  const userId = +res.locals.userId;

  if (!id) {
    const message = 'Invalid id !';
    throw unprocessableEntityError(message);
  }
  const credential = await credentialService.getById(userId, id);
  res.status(200).send({ data: credential });
}

export async function returnCredentials(req: Request, res: Response) {
  const userId = +res.locals.userId;

  const credentials = await credentialService.getAll(userId);
  res.status(200).send({ data: credentials });
}
