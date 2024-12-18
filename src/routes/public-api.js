import express from 'express';
import { adminOnly } from '../middleware/adminOnly.js';
import authenticateToken from '../middleware/authMiddleware.js';
import {
  register,
  login,
  getAllUsers,
  getMe,
} from '../controllers/userController.js';
import { upload } from '../middleware/uploadMiddleware.js';
import {
  createEvent,
  getAllEvent,
  getEventById,
  updateEvent,
  deleteEvent,
} from '../controllers/eventController.js';
import {
  createForum,
  deleteForum,
  getAllForum,
  getForumById,
  updateForum,
} from '../controllers/forumController.js';
import {
  createComment,
  getAllComment,
} from '../controllers/commentController.js';
import { addContact } from '../controllers/contactController.js';
export const router = express.Router();

// USER
router.post('/users/register', register);
router.post('/users/login', login);
router.get('/users', getAllUsers);
router.get('/users/me', authenticateToken, getMe);
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

// FORUM
router.post('/forums/create', authenticateToken, createForum);
router.delete('/forums/delete/:id', authenticateToken, deleteForum);
router.put('/forums/update/:id', authenticateToken, updateForum);
router.get('/forums', getAllForum);
router.get('/forums/:id', getForumById);

// COMMENT
router.post('/comment/create', authenticateToken, createComment);
router.get('/comment/:forum_id', getAllComment);

//CONTACT
router.post('/contact/create', authenticateToken, addContact);
