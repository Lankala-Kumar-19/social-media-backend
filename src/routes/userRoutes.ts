import express from 'express';
import { getAllUser,createUser,deleteAllUser,updateUser,deleteUser,findUser} from '../services/userService';
import { authMiddleware } from '../middleware/authMiddleware';
import { requireRole } from '../middleware/roleMiddleware';
import { requireOwnershipOrAdmin } from '../middleware/ownershipMiddleware';
import { loginUser } from '../services/authService';
const router = express.Router();


// GET ROUTES
router.get('/',authMiddleware,requireRole('ADMIN'),getAllUser);

router.get('/:email',authMiddleware,findUser);


// POST ROUTES

router.post('/',createUser);

router.post('/login',loginUser);

// PUT ROUTES

router.put('/update/:email',authMiddleware,requireOwnershipOrAdmin('email'),updateUser);

// DELETE ROUTES

router.delete('/',authMiddleware,requireRole('ADMIN'),deleteAllUser)

router.delete('/delete/:email',authMiddleware,requireOwnershipOrAdmin('email'),deleteUser);

export default router;