import Joi from 'joi';
import { CreateNetworkData } from '../services/networkService.js';

const CreateNetworkSchema = Joi.object<CreateNetworkData>({
  title: Joi.string().required(),
  name: Joi.string().required(),
  password: Joi.string().required(),
});

export default CreateNetworkSchema;
