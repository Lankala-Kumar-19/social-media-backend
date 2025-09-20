
import { UserModel } from "../models/User";
import { Request,Response,NextFunction } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import bcrypt from 'bcrypt';



export async function getAllUser(req:Request,res:Response,next:NextFunction){

    try{
        const user= await UserModel.find();
        return res.status(200).json(user);
    }catch(err){
        next(err);
    }
}


export async function createUser(req:Request,res:Response,next:NextFunction){
    try{
        const user=req.body;
        const hashPasswod = await bcrypt.hash(user.password,10);
        const exists = await UserModel.findOne({email:user.email});
        if(exists){
            return res.status(409).json({msg:`user already exist with this email `});
        }
        const created = await UserModel.create({...user,password:hashPasswod});
        res.status(201).json(created);
    }catch(err){
        next(err);
    }
}
export async function deleteAllUser(req:Request,res:Response,next:NextFunction){
    try{
        await UserModel.deleteMany();
        res.status(200).json({msg:`deleted all users`});
    }catch(err){
        res.status(200).json({msg:`xxxx`});
        next(err);
    }
}

export async function updateUser(req:Request,res:Response,next:NextFunction) {
    try{
        const id = req.params.userId;
        const user = await UserModel.findOneAndUpdate({id},req.body,{
            new:true,
            runValidators:true
        });
        if(!user) return res.status(401).json(`user not found`);
        res.status(200).json(user);
    }catch(err){
        next(err);
    }
}

export async function deleteUser(req:Request,res:Response,next:NextFunction) {
    try{
        const id = req.params.userId;
        const user =await UserModel.findOneAndDelete({id});
        res.status(200).json({msg:`user deleted`,user});
    }catch(err){
        next(err);
    }
}

export async function findUser(req:Request,res:Response,next:NextFunction){
    try{
        const id = req.params.userId;
        const user = await UserModel.findOne({id});
        if(!user) return res.status(400).json({msg: `user not found`});
        return res.status(201).json(user);

    }catch(err){
        next(err);
    }
}

export async function followUser(req:AuthRequest,res:Response,next:NextFunction){
    try{
        console.log("Target User ID:", req.params.id);
        console.log("Current User ID:", req.user?.userId);

        const id = req.params.id;
        const followerId= req.user?.userId;
        if(!followerId) return res.status(400).json({msg:`invalid user`});

        if(id === followerId) return res.status(400).json({msg:`you cannot follow yourself`});

        const user = await UserModel.findById(id);
        if(!user) return res.status(400).json({msg:`user not found`});
        
        const follower = await UserModel.findById(followerId);
        if(!follower) return res.status(400).json({msg:`invalid user`});

        const alreadyFollowing = follower.following.includes(user.id);
        if(alreadyFollowing) return res.status(400).json({msg:`already following`});
        user.followers.push(follower?.id);
        follower.following.push(user.id);
        await user.save();
        await follower.save();
        return res.status(200).json({msg:"followed user"});
    }catch(err){
        next(err);
    }
}

export async function unfollowUser(req:AuthRequest,res:Response,next:NextFunction){
    try{
        const userId = req.user?.userId;
    const targetId = req.params.id;
    console.log("Target User ID:", req.params.id);
        console.log("Current User ID:", req.user?.userId);

    if(!targetId) return res.status(400).json({msg:`invalid user`});

    if(userId === targetId) return res.status(400).json({msg:`you cannot unfollow yourself`});

    const user = await UserModel.findById(userId);

    if(!user) return res.json({msg:`invalid user`});

    const targetUser = await UserModel.findById(targetId);

    if(!targetUser) return res.json({msg:`user not found`});

    user.following = user.following.filter(id=> id.equals(targetUser.id));

    targetUser.followers = targetUser.followers.filter(id=> id!=user.id);

    await user.save();
    await targetUser.save();

    return res.status(200).json({msg:`unfollowed user`});
    }catch(err){
        next(err);
    }

} 

export async function getAllFollowers(req:AuthRequest,res:Response,next:NextFunction) {
    try{
        const id = req.params.id;
        if(!id) return res.status(400).json({msg:`id not found`});

        const user = await UserModel.findById(id);

        if(!user) return res.status(200).json({msg:`user not found`});

        return res.status(200).json({
            count: user.followers.length,
            users: user.followers
        });

    }catch(err){
        next(err);
    }
}

export async function getAllFollowing(req:AuthRequest,res:Response,next:NextFunction){
    try{
        const id = req.params.id;
        if(!id) return res.status(400).json({msg:`id not found`});

        const user = await UserModel.findById(id);

        if(!user) return res.status(200).json({msg:`user not found`});

        return res.status(200).json({
            count: user.following.length,
            users: user.following
        });

    }catch(err){
        next(err);
    }
}