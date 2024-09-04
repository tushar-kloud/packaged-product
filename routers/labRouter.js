import express from 'express';
import {authMiddleware} from '../middlewares/firebaseTokenVerify.js';
import { getAllLabs, getLabDetails, createLab } from '../controllers/labController.js';

const labRouter = express.Router();


labRouter.post('/create-lab', createLab);
// Route to get labs by user company
labRouter.get('/labs',authMiddleware, getAllLabs);

// Route to get lab details and update user status
labRouter.get('/labs/:labId',authMiddleware, getLabDetails);

export default labRouter;