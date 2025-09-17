import { Document, Model, Types } from "mongoose";
import { IUser } from "./User";
import { IComment } from "./Comment";
export interface IPost extends Document {
    title: string;
    body: string;
    tags: string[];
    slug: string;
    createdAt?: Date;
    updatedAt?: Date;
    author: Types.ObjectId | IUser;
    likes: Types.ObjectId | IUser[];
    comments: Types.ObjectId | IComment[];
}
export declare const PostModel: Model<IPost>;
//# sourceMappingURL=Post.d.ts.map