import mongoose,{Document,Model,Schema, Types} from "mongoose";
import { IUser } from "./User";
import { IComment } from "./Comment";
export interface IPost extends Document{
    title:string,
    body:string,
    tags:string[],
    slug:string,
    createdAt?:Date;
    updatedAt?:Date;
    author:Types.ObjectId | IUser;
    likes: Types.ObjectId |IUser[];
    comments: Types.ObjectId |IComment[];

}

const postSchema:Schema<IPost> = new Schema({
    title:{type:String,required:true},
    body:{type:String,required:true},
    tags:{type:[String]},
    slug:{type:String,required:true,unique:true},
    author:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    // likes:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}],
    // comments:[{type:mongoose.Schema.Types.ObjectId,ref:'Comment'}]

},{
    timestamps:true
});

export const PostModel:Model<IPost> = mongoose.model<IPost>("Post",postSchema); 