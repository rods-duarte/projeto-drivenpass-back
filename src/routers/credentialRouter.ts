import { Router } from 'express';
import validateSchema from '../middlewares/schemaValidateMiddleware.js';
import validateToken from '../middlewares/tokenValidateMiddleware.js';
import createCredentialSchema from '../models/CreateCredentialSchema.js';
import { newCredential } from '../controllers/credentialController.js';

const credentialRouter = Router();

credentialRouter.post(
  '/credentials',
  validateSchema(createCredentialSchema),
  validateToken,
  newCredential
);
credentialRouter.get('/credentials/:id', validateToken, getCredentials);
credentialRouter.delete('/credential/:id');

export default credentialRouter;
