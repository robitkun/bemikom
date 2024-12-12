import express from 'express';
import { errorMiddleware } from '../middleware/errorMiddleware.js';
import { router } from '../routes/public-api.js';

export const app = express();
app.use(express.json());
app.use('/api', router);
app.use(errorMiddleware);
