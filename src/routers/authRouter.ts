import { Router } from 'express';
// controllers
import { register } from '../controllers/authController.js';
// middlewares
import validateUniqueEmail from '../middlewares/authMiddleware.js';
import validateSchema from '../middlewares/schemaValidateMiddleware.js';
// schemas
import RegisterDataSchema from '../models/RegisterDataSchema.js';

const authRouter = Router();

authRouter.post(
  '/signup',
  validateSchema(RegisterDataSchema),
  validateUniqueEmail,
  register
);
authRouter.post('signin');

export default authRouter;
