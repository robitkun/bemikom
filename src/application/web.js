import express from 'express';
import { errorMiddleware } from '../middleware/errorMiddleware.js';
import { router } from '../routes/public-api.js';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const app = express();

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));
app.use(express.json());
app.use('/api', router);
app.use(
  '/uploads_events',
  express.static(path.join(__dirname, '../../uploads_events'))
);
app.use(errorMiddleware);
