import mongoose,{Document,Model,Schema, Types} from "mongoose";
import slugify from "slugify";
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

postSchema.index({tags:1},{unique:true});

postSchema.pre<IPost>('validate',async function (next) {
    if(this.isNew ||this.isModified('title')){
        let baseSlug= slugify(this.title,{lower:true,strict:true});
        let slug=baseSlug;
        let counter =1;

        while( await PostModel.exists({slug})){
            slug= `${baseSlug}-${counter}`;
            counter++;
        }
        this.slug=slug;

    }
    next();
});

postSchema.virtual('comments',{
    ref:'Comment',
    localField:'_id',
    foreignField:'post'
});
postSchema.virtual('likes',{
    ref:'Like',
    localField:'_id',
    foreignField:'post'
});

export const PostModel:Model<IPost> = mongoose.model<IPost>("Post",postSchema); 