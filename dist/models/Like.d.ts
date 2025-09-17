import { Document, Model, Types } from "mongoose";
import { IUser } from "./User";
import { IPost } from "./Post";
export interface ILike extends Document {
    user: Types.ObjectId | IUser;
    post: Types.ObjectId | IPost;
}
export declare const LikeModel: Model<ILike>;
//# sourceMappingURL=Like.d.ts.map