
import { UserModel } from "../models/User";
import { Request,Response,NextFunction } from "express";
import bcrypt from 'bcrypt';
import { json } from "stream/consumers";
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
        const email = req.params.email;
        const user = await UserModel.findOneAndUpdate({email},req.body,{
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
        const email = req.params.email;
        const user =await UserModel.findOneAndDelete({email});
        res.status(200).json({msg:`user deleted`,user});
    }catch(err){
        next(err);
    }
}

export async function findUser(req:Request,res:Response,next:NextFunction){
    try{
        const email = req.params.email;
        const user = await UserModel.findOne({email});
        if(!user) return res.status(400).json({msg: `user not found`});
        return res.status(201).json(user);

    }catch(err){
        next(err);
    }
}