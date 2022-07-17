import { Router } from 'express';
import validateSchema from '../middlewares/schemaValidateMiddleware.js';
import validateToken from '../middlewares/tokenValidateMiddleware.js';
import {
  newNetwork,
  returnNetwork,
  returnNetworks,
  deleteNetwork,
} from '../controllers/networkController.js';
import CreateNetworkSchema from '../models/CreateNetworkSchema.js';

const networkRouter = Router();

networkRouter.post(
  '/networks',
  validateSchema(CreateNetworkSchema),
  validateToken,
  newNetwork
);
networkRouter.get('/networks/:id', validateToken, returnNetwork);
networkRouter.get('/networks', validateToken, returnNetworks);
networkRouter.delete('/networks/:id', validateToken, deleteNetwork);

export default networkRouter;
