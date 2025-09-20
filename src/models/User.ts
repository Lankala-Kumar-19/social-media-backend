import mongoose,{Document, Schema,Model,Types} from "mongoose";
import { IPost } from "./Post";
import { ObjectId } from "mongodb";
import { ref } from "process";

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
    updatedAt:Date,
    followers: Types.ObjectId[],
    following: Types.ObjectId[]
    // posts:IPost  
}



const userSchema: Schema<IUser> = new Schema({
    email: {type:String,required:true,unique:true},
    password: {type:String,required:true},
    name: {type:String,required:true},
    bio: {type:String},
    avatar: {type:String},
    role: {type:String,enum: Object.values(Role),required:true},
    followers : [{type:mongoose.Schema.Types.ObjectId,ref:'User'}],
    following : [{type:mongoose.Schema.Types.ObjectId,ref:'User'}]
    // posts:[{type:Types.ObjectId,ref:'Post'}]
}
,{
    timestamps:true,
    toJSON:{
        transform:(_doc,ret:any)=>{
            //delete ret._id;
            delete ret.__v;
            delete ret.password;
        },
    },
}
);


export const UserModel:Model<IUser> = mongoose.model<IUser>("User",userSchema);

