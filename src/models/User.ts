import mongoose,{Document, Schema,Model,Types} from "mongoose";
import { IPost } from "./Post";

export enum Role{
    USER='USER',ADMIN='ADMIN'
}

export interface IUser extends Document{
    email:string,
    password:string,
    name:string,
    bio?:string,
    avatar?:string,
    role:Role,
    createdAt:Date,
    updatedAt:Date
    // posts:IPost  
}



const userSchema: Schema<IUser> = new Schema({
    email: {type:String,required:true,unique:true},
    password: {type:String,required:true},
    name: {type:String,required:true},
    bio: {type:String},
    avatar: {type:String},
    role: {type:String,enum: Object.values(Role),required:true},
    // posts:[{type:Types.ObjectId,ref:'Post'}]
},{
    timestamps:true
});

export const UserModel:Model<IUser> = mongoose.model<IUser>("User",userSchema);