import { Router } from 'express';
// controllers
import { register, login } from '../controllers/authController.js';
// middlewares
import validateUniqueEmail from '../middlewares/emailValidateMiddleware.js';
import validateSchema from '../middlewares/schemaValidateMiddleware.js';
import validateCredentials from '../middlewares/loginValidateMiddleware.js';
import LoginDataSchema from '../models/LoginDataSchema.js';
// schemas
import RegisterDataSchema from '../models/RegisterDataSchema.js';

const authRouter = Router();

authRouter.post(
  '/signup',
  validateSchema(RegisterDataSchema),
  validateUniqueEmail,
  register
);
authRouter.post(
  '/signin',
  validateSchema(LoginDataSchema),
  validateCredentials,
  login
);

export default authRouter;
