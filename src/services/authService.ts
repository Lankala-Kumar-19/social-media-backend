import { Request,Response,NextFunction } from "express";
import { UserModel } from "../models/User";
import bcrypt from 'bcrypt';
import jwt,{Secret} from "jsonwebtoken";

type StringValue = `${number}${"ms" | "s" | "m" | "h" | "d" | "w" | "y"}`;
export async function loginUser(req: Request, res: Response, next: NextFunction){
    try{
        const{email,password} = req.body;

        const user = await UserModel.findOne({email});
        if(!user){
            return res.status(401).json({msg: `invalid email or password`});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({msg: `invalid email or password`});
        }
        const secret:Secret = process.env.JWT_SECRET || 'qwertyuiopasdfghjklzxcvbnm';
        const expiresIn: StringValue = (process.env.JWT_EXPIRES_IN as StringValue) || '1d';
        
        if(!secret) throw new Error("jwt_secret is not defined");
        const token = jwt.sign(
            {userId: user._id, role: user.role},
            secret,
            {expiresIn}
        );

        res.status(200).json({token});

    }catch(err){
        next(err);
    }
}