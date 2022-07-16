import { Router } from 'express';
import validateToken from '../middlewares/tokenValidateMiddleware.js';
import validateSchema from '../middlewares/schemaValidateMiddleware.js';
import {
  newCard,
  returnCard,
  returnCards,
  deleteCard,
} from '../controllers/cardController.js';
import CreateCardSchema from '../models/CreateCardSchema.js';

const cardRouter = Router();

cardRouter.post(
  '/cards',
  validateSchema(CreateCardSchema),
  validateToken,
  newCard
);
cardRouter.get('/cards/:id', validateToken, returnCard);
cardRouter.get('/cards', validateToken, returnCards);
cardRouter.delete('/cards/:id', validateToken, deleteCard);

export default cardRouter;
