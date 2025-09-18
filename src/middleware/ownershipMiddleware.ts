import { Response,NextFunction } from "express";
import { AuthRequest } from "./authMiddleware";

export function requireOwnershipOrAdmin(paramEmail:string = 'email'){
    return(req:AuthRequest,res:Response,next:NextFunction) =>{
        const loggedInUser = req.user;

        const targetUserEmail = req.params[paramEmail];

        if(!loggedInUser) return res.status(401).json({ msg: 'Unauthorized' });

        if(loggedInUser.email === targetUserEmail || loggedInUser.role==='ADMIN'){
            return next();
        }

        return res.status(403).json({msg:`forbidden: not the owner or admin`});
    };
}