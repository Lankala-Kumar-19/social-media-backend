import express from 'express';
import { getAllUser,createUser,deleteAllUser,updateUser,deleteUser,findUser,followUser,unfollowUser,getAllFollowers,getAllFollowing} from '../services/userService';
import { authMiddleware } from '../middleware/authMiddleware';
import { requireRole } from '../middleware/roleMiddleware';
import { requireOwnershipOrAdmin } from '../middleware/ownershipMiddleware';
import { loginUser } from '../services/authService';
const router = express.Router();


// GET ROUTES
router.get('/',authMiddleware,requireRole('ADMIN'),getAllUser);

router.get('/:id',authMiddleware,findUser);

router.get('/:id/followers',authMiddleware,getAllFollowers);

router.get('/:id/following',authMiddleware,getAllFollowing);

// POST ROUTES

router.post('/',createUser);

router.post('/login',loginUser);

router.post('/:id/follow',authMiddleware,followUser);



// PUT ROUTES

router.put('/update/:id',authMiddleware,requireOwnershipOrAdmin('id'),updateUser);

// DELETE ROUTES

router.delete('/',authMiddleware,requireRole('ADMIN'),deleteAllUser)

router.delete('/delete/:id',authMiddleware,requireOwnershipOrAdmin('id'),deleteUser);

router.delete('/:id/unfollow',authMiddleware,unfollowUser);

export default router;