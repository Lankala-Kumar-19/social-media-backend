import express from 'express';
import { getAllUser,createUser,deleteAllUser } from '../services/userService';
import { authMiddleware } from '../middleware/authMiddleware';
import { loginUser } from '../services/authService';
const router = express.Router();

router.get('/',authMiddleware,getAllUser);

router.post('/',createUser);

router.post('/login',loginUser);

router.delete('/',authMiddleware,deleteAllUser)

export default router;