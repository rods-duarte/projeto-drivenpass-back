import { Request, Response } from 'express';
import credentialService, {
  CreateCredentialData,
} from '../services/credentialService.js';

export async function newCredential(req: Request, res: Response) {
  const { body } = req;
  const userId: number = res.locals.userId;
  const token: string = res.locals.token;

  const credential: CreateCredentialData = { ...body, userId };
  await credentialService.validateTitle(credential);

  await credentialService.create(credential);
  res.status(200).send({ token });
}
