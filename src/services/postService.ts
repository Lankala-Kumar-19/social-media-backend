import {Request, Response,NextFunction } from "express";
import { PostModel } from "../models/Post";
import { AuthRequest } from "../middleware/authMiddleware";
import mongoose from "mongoose";
export async function createPost(req:AuthRequest,res:Response,next:NextFunction){
    try{

        const post = req.body;
        const author = req.user?.userId;
        //post.author = author;
        const created = await PostModel.create({...post,author:author});
        if(!created) return res.status(400).json({msg:`post is not created`});
        return res.status(200).json(created);
    }catch(err){
        next(err);
    }
}

export async function findAll(req:Request,res:Response,next:NextFunction){
    try{
        const posts = await PostModel.find();
        if(!posts) return res.status(400).json({msg:`posts not found`});
        return res.status(201).json(posts);
    }catch(err){
        next(err);
    }
}

export async function findPost(req:Request,res:Response,next:NextFunction){
    try{
        const slug = req.params.slug;
        const post = await PostModel.findOne({slug}).populate('author','comments likes');
        if(!post) return res.status(400).json({msg:`post not found`});
        return res.status(201).json(post);
    }catch(err){
        next(err);
    }
}

export async function deletePost(req:Request,res:Response,next:NextFunction){
    try{
        const slug = req.params.slug;
        const post= await PostModel.findOneAndDelete({slug});
        return res.status(201).json({msg:`post deleted`, post});
    }catch(err){
        next(err);
    }
}

export async function updatePost(req:Request,res:Response,next:NextFunction){
    try{
        const slug = req.params.slug;

        const updated = await PostModel.findOneAndUpdate({slug},req.body,{
            runValidators:true,
            new:true
        });
        if(!updated) return res.status(401).json({msg:`post not updated`});
        return res.status(201).json(updated);
    }catch(err){
        next(err);
    }
}

export async function likePost(req:AuthRequest,res:Response,next:NextFunction){
    try{
        const slug = req.params.slug;
        const id = req.user?.userId;
        if (!id) {
            return res.status(401).json({ msg: "Unauthorized" });
        }
        const post = await PostModel.findOne({slug});
        if (!post) {
            return res.status(404).json({ msg: "Post not found" });
        }
        const alreadyLiked = post?.likes.some(x=> x.toString()===id);
        if(alreadyLiked) return res.status(400).json({msg:`you already liked this post`});
        //const userObjectId = new mongoose.Types.ObjectId(id);
        post?.likes.push(new mongoose.Types.ObjectId(id));
        await post?.save();
        return res.status(200).json(post);
    }catch(err){
        next(err);
    }
}

export async function unlikePost(req:AuthRequest,res:Response,next:NextFunction){
    try{
        const userId = req.user?.userId;
        const slug = req.params.slug;
        const post = await PostModel.findOne({slug});
        if (!post) {
            return res.status(404).json({ msg: "Post not found" });
        }
        if(!userId) return res.status(401).json({ msg: "Unauthorized" });

        const liked = post.likes.some(x=>x.toString()===userId);
        if(!liked) return res.status(400).json({msg:`you already unliked this post`});

        post.likes = post.likes.filter(x=>x.toString()!==userId);
        await post?.save();
        return res.status(201).json(post);

    }catch(err){
        next(err);
    }
}

export async function allLikes(req:AuthRequest,res:Response,next:NextFunction){
    try{
        const slug = req.params.slug;
        const post = await PostModel.findOne({slug}).populate('likes','name email _id');
        if(!post) return res.status(404).json({msg:`post not found`});

        return res.status(200).json({
            likes:post.likes,
            count: post.likes.length
        });
    }catch(err){
        next(err);
    }
}

export async function getUserLikedPosts(req:AuthRequest,res:Response,next:NextFunction){
    try{
        const id = req.user?.userId;
        if(!id) return res.status(401).json({msg:`unauthorized`});

        const likedPosts = await PostModel.find({likes: id}).select('title slug author createdAt').populate('author','name');

        return res.status(200).json({
            count: likedPosts.length,
            posts: likedPosts

        });
    }catch(err){
        next(err);
    }
}