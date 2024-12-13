import express from 'express';
import { adminOnly } from '../middleware/adminOnly.js';
import authenticateToken from '../middleware/authMiddleware.js';
import { register, login, getAllUsers } from '../controllers/userController.js';
import { upload } from '../middleware/uploadMiddleware.js';
import {
  createEvent,
  getAllEvent,
  getEventById,
  updateEvent,
  deleteEvent,
} from '../controllers/eventController.js';
export const router = express.Router();

// USER
router.post('/users/register', register);
router.post('/users/login', login);
router.get('/users', authenticateToken, adminOnly, getAllUsers);

// EVENT
router.post(
  '/event/upload',
  authenticateToken,
  adminOnly,
  upload.single('image'),
  createEvent
);
router.get('/event/:id', getEventById);
router.get('/event', getAllEvent);
router.put(
  '/event/update/:id',
  authenticateToken,
  adminOnly,
  upload.single('image'),
  updateEvent
);
router.delete(
  '/event/delete/:id',
  authenticateToken,
  adminOnly,
  upload.single('image'),
  deleteEvent
);
