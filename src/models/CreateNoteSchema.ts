import Joi from 'joi';
import { CreateNoteData } from '../services/noteService.js';

const CreateNoteSchema = Joi.object<CreateNoteData>({
  title: Joi.string().required(),
  content: Joi.string().required(),
});

export default CreateNoteSchema;
