import mongoose,{Model,Schema,Document, Types} from "mongoose";
import { IUser } from "./User";
import { IPost } from "./Post";

export interface IComment extends Document{
    text:string;
    createdAt?:Date;
    updatedAt?:Date;
    user:Types.ObjectId |IUser;
    post:Types.ObjectId |IPost;
    parentComment?:Types.ObjectId |IComment;
}

const commentSchema:Schema<IComment> = new Schema({
    text:{type:String,required:true},
    user:{type:mongoose.Schema.ObjectId,ref:'User',required:true},
    post:{type:mongoose.Schema.ObjectId,ref:'Post',required:true},
    parentComment: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', default: null },
},{
    timestamps:true
});

commentSchema.index({post:1});
export const CommentModel:Model<IComment> = mongoose.model<IComment>("Comment",commentSchema);