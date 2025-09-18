import express from 'express';
import { createPost,findAll,findPost,deletePost,updatePost } from "../services/postService";
import { authMiddleware } from '../middleware/authMiddleware';
import { requireOwnershipOrAdmin } from '../middleware/ownershipMiddleware';
const router = express.Router();

// GET ROUTES

router.get('/',authMiddleware,findAll);

router.get('/:slug',authMiddleware,findPost);

// POST ROUTES

router.post('/',authMiddleware,createPost);

// PUT ROUTES

router.put('/:slug',authMiddleware,requireOwnershipOrAdmin('id'),updatePost);

// DELETE ROUTES

router.delete('/:slug',authMiddleware,requireOwnershipOrAdmin('id'),deletePost);


export default router;