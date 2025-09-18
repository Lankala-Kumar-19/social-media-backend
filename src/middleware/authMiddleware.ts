import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


const secret = process.env.JWT_SECRET || 'qwertyuiopasdfghjklzxcvbnm';

export interface AuthRequest extends Request{
    user?:{
        userId: string;
        role: 'USER' | 'ADMIN';
    };
}

export function authMiddleware(req: AuthRequest,res:Response,next:NextFunction){
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({msg: `unauthorized: no token provided`});
    }
    const token = authHeader.split(' ')[1] || '';
    try{
        const decoded = jwt.verify(token, secret) as {userId:string, role: 'USER' | 'ADMIN'};
        req.user = decoded;
        next();
    }catch(err){
        return res.status(401).json({ msg: 'Unauthorized: Invalid token' });
    }
}