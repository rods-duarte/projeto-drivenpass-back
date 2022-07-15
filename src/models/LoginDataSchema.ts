import Joi from 'joi';
import { LoginData } from '../services/authService.js';

const LoginDataSchema = Joi.object<LoginData>({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export default LoginDataSchema;
