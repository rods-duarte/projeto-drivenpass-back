import client from '../config/database.js';
import { CreateNetworkData } from '../services/networkService.js';

async function insert(data: CreateNetworkData) {
  await client.network.create({
    data,
  });
}

async function findAll(userId: number) {
  const networks = await client.network.findMany({
    where: {
      userId,
    },
  });
  return networks;
}

async function findById(id: number) {
  const network = await client.network.findUnique({
    where: {
      id,
    },
  });
  return network;
}

// async function findByUserIdAndTitle(userId: number, title: string) {
//   const network = await client.network.findFirst({
//     where: {
//       userId,
//       title: {
//         mode: 'insensitive',
//         equals: title,
//       },
//     },
//   });
//   return network;
// }

async function remove(userId: number, id: number) {
  await client.network.deleteMany({
    where: {
      id,
      userId,
    },
  });
}

const networkRepository = {
  insert,
  findAll,
  findById,
  remove,
};

export default networkRepository;
