import { Response,NextFunction } from "express";
import { AuthRequest } from "./authMiddleware";

export function requireOwnershipOrAdmin(paramId:string = 'id'){
    return(req:AuthRequest,res:Response,next:NextFunction) =>{
        const loggedInUser = req.user;

        const targetUserId = req.params[paramId];

        if(!loggedInUser) return res.status(401).json({ msg: 'Unauthorized' });

        if(loggedInUser.userId === targetUserId || loggedInUser.role==='ADMIN'){
            return next();
        }

        return res.status(403).json({msg:`forbidden: not the owner or admin`});
    };
}