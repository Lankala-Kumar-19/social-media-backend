import express from 'express';
import { createPost,findAll,findPost,deletePost,updatePost,likePost,unlikePost,allLikes,getUserLikedPosts } from "../services/postService";
import { authMiddleware } from '../middleware/authMiddleware';
import { requireOwnershipOrAdmin } from '../middleware/ownershipMiddleware';
const router = express.Router();

// GET ROUTES

router.get('/',authMiddleware,findAll);

router.get('/:slug',authMiddleware,findPost);

router.get('/:slug/likes',authMiddleware,allLikes);

router.get('/user/:id/likes',authMiddleware,requireOwnershipOrAdmin('id'),getUserLikedPosts);

// POST ROUTES

router.post('/',authMiddleware,createPost);

router.post('/:slug/like',authMiddleware,likePost);

// PUT ROUTES

router.put('/:slug',authMiddleware,requireOwnershipOrAdmin('id'),updatePost);

// DELETE ROUTES

router.delete('/:slug',authMiddleware,requireOwnershipOrAdmin('id'),deletePost);

router.delete('/:slug/unlike',authMiddleware,unlikePost);


export default router;