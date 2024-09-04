import express from 'express';
import { createUser, getUserData } from '../controllers/userController.js';
import {authMiddleware} from '../middlewares/firebaseTokenVerify.js';

const userRouter = express.Router();

// Middleware to verify Firebase token for all routes
// router.use(authMiddleware);

// Route to create a new user
userRouter.post('/create-user', authMiddleware, createUser);

// Route to get a user by ID
userRouter.get('/get-user-data', authMiddleware, getUserData);

export default userRouter;
