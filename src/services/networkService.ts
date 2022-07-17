import { Network } from '@prisma/client';
import networkRepository from '../repositories/networkRepository.js';
import {
  unprocessableEntityError,
  notFoundError,
  unauthorizedError,
} from '../middlewares/errorHandlerMiddleware.js';
import { decrypt } from '../utils/cryptUtils.js';

export type CreateNetworkData = Omit<Network, 'id' | 'createdAt'>;

async function create(newNetwork: CreateNetworkData) {
  await networkRepository.insert(newNetwork);
}

async function getById(userId: number, id: number) {
  if (!id) {
    const message = 'Invalid id !';
    throw unprocessableEntityError(message);
  }

  const network = await networkRepository.findById(id);

  if (!network) {
    const message = 'Network not found !';
    throw notFoundError(message);
  }

  if (network.userId !== userId) {
    const message = 'Unauthorized !';
    throw unauthorizedError(message);
  }

  network.password = decrypt(network.password);

  return network;
}

async function getAll(userId: number) {
  const networks = await networkRepository.findAll(userId);
  return networks.map((credential) => ({
    ...credential,
    password: decrypt(credential.password),
  }));
}

async function remove(userId: number, id: number) {
  if (!id) {
    const message = 'Invalid id !';
    throw unprocessableEntityError(message);
  }

  const network = await networkRepository.findById(id);

  if (!network) {
    const message = 'WiFi network not found !';
    throw notFoundError(message);
  }

  if (network.userId !== userId) {
    const message = 'Unauthorized !';
    throw unauthorizedError(message);
  }

  await networkRepository.remove(userId, id);
}

const networkService = {
  create,
  getAll,
  getById,
  remove,
};

export default networkService;
