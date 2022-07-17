import { Request, Response } from 'express';
import { crypt } from '../utils/cryptUtils.js';
import networkService, {
  CreateNetworkData,
} from '../services/networkService.js';

export async function newNetwork(req: Request, res: Response) {
  console.log('CONTROLLER');
  const { body } = req;
  body.password = crypt(body.password);
  const userId: number = res.locals.userId;

  const network: CreateNetworkData = { ...body, userId };

  await networkService.create(network);
  res.status(200).send('Success');
}

export async function returnNetwork(req: Request, res: Response) {
  const id = +req.params.id;
  const userId = +res.locals.userId;

  const network = await networkService.getById(userId, id);
  res.status(200).send({ data: network });
}

export async function returnNetworks(req: Request, res: Response) {
  const userId = +res.locals.userId;

  const networks = await networkService.getAll(userId);
  res.status(200).send({ data: networks });
}

export async function deleteNetwork(req: Request, res: Response) {
  const id = +req.params.id;
  const userId = +res.locals.userId;

  await networkService.remove(userId, id);
  res.status(200).send('Success');
}
