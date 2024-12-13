import express from 'express';
import { errorMiddleware } from '../middleware/errorMiddleware.js';
import { router } from '../routes/public-api.js';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const app = express();
app.use(express.json());
app.use('/api', router);
app.use(
  '/uploads_events',
  express.static(path.join(__dirname, '../../uploads_events'))
);
app.use(errorMiddleware);
