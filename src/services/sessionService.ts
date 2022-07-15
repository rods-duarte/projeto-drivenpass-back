import { Session } from '@prisma/client';
import sessionRepository from '../repositories/sessionRepository.js';

export type CreateSessionData = Omit<Session, 'id' | 'createdAt'>;
export type UpdateSessionData = Partial<Session>;

async function getByUserId(userId: number) {
  const session = await sessionRepository.findByUserId(userId);
  return session;
}

async function create(newSession: CreateSessionData) {
  await sessionRepository.insert(newSession);
}

async function close(session: Session | null) {
  if (!session?.valid) return;
  await sessionRepository.update(session.id, { valid: false });
}

const sessionService = {
  create,
  getByUserId,
  close,
};

export default sessionService;
