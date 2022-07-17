import { Router } from 'express';
import authRouter from './authRouter.js';
import cardRouter from './cardRouter.js';
import credentialRouter from './credentialRouter.js';
import networkRouter from './networkRouter.js';
import noteRouter from './noteRouter.js';

const router = Router();
router.use(authRouter);
router.use(credentialRouter);
router.use(noteRouter);
router.use(cardRouter);
router.use(networkRouter);

export default router;
