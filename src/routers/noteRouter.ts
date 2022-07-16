import { Router } from 'express';
import validateToken from '../middlewares/tokenValidateMiddleware.js';
import validateSchema from '../middlewares/schemaValidateMiddleware.js';
import CreateNoteSchema from '../models/CreateNoteSchema.js';
import {
  newNote,
  returnNote,
  returnNotes,
  deleteNote,
} from '../controllers/noteController.js';

const noteRouter = Router();
noteRouter.post(
  '/notes',
  validateSchema(CreateNoteSchema),
  validateToken,
  newNote
);
noteRouter.get('/notes/:id', validateToken, returnNote);
noteRouter.get('/notes', validateToken, returnNotes);
noteRouter.delete('/notes/:id', validateToken, deleteNote);

export default noteRouter;
