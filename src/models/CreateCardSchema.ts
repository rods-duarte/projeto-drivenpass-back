import Joi from 'joi';
import { CreateCardData } from '../services/cardService.js';

const CreateCardSchema = Joi.object<CreateCardData>({
  title: Joi.string().required(),
  number: Joi.string().length(19).required(),
  cardHolderName: Joi.string().required(),
  securityCode: Joi.string().length(3).required(),
  expirationDate: Joi.string().regex(/^\d{2}\/\d{2}$/),
  password: Joi.string().required(),
  virtual: Joi.bool().required(),
  type: Joi.valid('Credit', 'Debit', 'Both').required(),
});

export default CreateCardSchema;
