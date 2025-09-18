import {Request, Response,NextFunction } from "express";
import { PostModel } from "../models/Post";
import { AuthRequest } from "../middleware/authMiddleware";
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
        const post = await PostModel.findOne({slug});
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