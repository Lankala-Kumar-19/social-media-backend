import { Document, Model } from "mongoose";
export declare enum Role {
    USER = "USER",
    ADMIN = "ADMIN"
}
export interface IUser extends Document {
    email: string;
    password: string;
    name: string;
    bio?: string;
    avatar?: string;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
}
export declare const UserModel: Model<IUser>;
//# sourceMappingURL=User.d.ts.map