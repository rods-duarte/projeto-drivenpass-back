import express, { json } from 'express';
import 'express-async-errors';
import cors from 'cors';
import errorHandler from './middlewares/errorHandlerMiddleware.js';
import './config/setup.js';

import router from './routers/index.js';

const app = express();
app.use(json());
app.use(cors());
app.use(router);
app.use(errorHandler);

const port = +process.env.PORT || 5000;
app.listen(port, () => {
  console.log(' Server listening on port', port);
});
