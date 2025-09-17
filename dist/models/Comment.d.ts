import { Model, Document, Types } from "mongoose";
import { IUser } from "./User";
import { IPost } from "./Post";
export interface IComment extends Document {
    text: string;
    createdAt?: Date;
    updatedAt?: Date;
    user: Types.ObjectId | IUser;
    post: Types.ObjectId | IPost;
    parentComment?: Types.ObjectId | IComment;
}
export declare const CommentModel: Model<IComment>;
//# sourceMappingURL=Comment.d.ts.map