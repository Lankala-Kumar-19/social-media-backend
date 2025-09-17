// import { Request,Response,NextFunction } from "express";
// import { UserModel } from "../models/User";
// import bcrypt from 'bcrypt';
// import jwt from "jsonwebtoken";

// export async function loginUser(req: Request, res: Response, next: NextFunction){
//     try{
//         const{email,password} = req.body;

//         const user = await UserModel.findOne({email});
//         if(!user){
//             return res.status(401).json({msg: `invalid email or password`});
//         }
//         const isMatch = await bcrypt.compare(password,user.password);
//         if(!isMatch){
//             return res.status(401).json({msg: `invalid email or password`});
//         }
//         const secret = process.env.JWT_SECRET;
//         if(!secret) throw new Error("jwt_secret is not defined");
//         const token = jwt.sign(
//             {userId: user._id, role: user.role},
//             secret,
//             {expiresIn: process.env.JWT_EXPIRES_IN || '1d'}
//         );

//         res.status(200).json({token});

//     }catch(err){
//         next(err);
//     }
// }