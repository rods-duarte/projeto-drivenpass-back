import { Request, Response } from 'express';
import credentialService, {
  CreateCredentialData,
} from '../services/credentialService.js';
import { crypt } from '../utils/cryptUtils.js';

export async function newCredential(req: Request, res: Response) {
  const { body } = req;
  body.password = crypt(body.password);
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

  const credential = await credentialService.getById(userId, id);
  res.status(200).send({ data: credential });
}

export async function returnCredentials(req: Request, res: Response) {
  const userId = +res.locals.userId;

  const credentials = await credentialService.getAll(userId);
  res.status(200).send({ data: credentials });
}

export async function deleteCredential(req: Request, res: Response) {
  const id = +req.params.id;
  const userId = +res.locals.userId;

  await credentialService.remove(userId, id);
  res.status(200).send('Sucess');
}
