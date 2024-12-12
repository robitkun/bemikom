import express from 'express';
import { register, login } from '../controllers/userController.js';
export const router = express.Router();
router.post('/users', register);
router.post('/users/login', login);
