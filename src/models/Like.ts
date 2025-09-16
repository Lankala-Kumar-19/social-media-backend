import mongoose,{Document, Model, Schema, Types} from "mongoose";
import { IUser } from "./User";
import { IPost } from "./Post";

export interface ILike extends Document{
    user: Types.ObjectId |IUser;
    post:Types.ObjectId | IPost;
}

const likeSchema :Schema<ILike> = new Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required: true },
    post:{type:mongoose.Schema.Types.ObjectId,ref:'Post',required: true }
});

likeSchema.index({user:1,post:1},{unique:true});
export const LikeModel:Model<ILike> = mongoose.model<ILike>("Like",likeSchema);