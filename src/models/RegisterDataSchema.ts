import Joi from 'joi';
import { CreateUserData } from '../services/userService.js';

const RegisterDataSchema = Joi.object<CreateUserData>({
  email: Joi.string().email().required(),
  password: Joi.string().min(10).required(),
});

export default RegisterDataSchema;
