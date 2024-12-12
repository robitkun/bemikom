import express from 'express';
import { adminOnly } from '../middleware/adminOnly.js';
import authenticateToken from '../middleware/authMiddleware.js';
import { register, login, getAllUsers } from '../controllers/userController.js';
import { upload } from '../middleware/uploadMiddleware.js';
import { createEvent } from '../controllers/eventController.js';
export const router = express.Router();

router.post('/users/register', register);
router.post('/users/login', login);
router.get('/users', authenticateToken, adminOnly, getAllUsers);
router.post('/event/upload', upload.single('image'), createEvent);
