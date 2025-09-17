"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const slugify_1 = __importDefault(require("slugify"));
const postSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    tags: { type: [String] },
    slug: { type: String, required: true, unique: true },
    author: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
    // likes:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}],
    // comments:[{type:mongoose.Schema.Types.ObjectId,ref:'Comment'}]
}, {
    timestamps: true
});
postSchema.index({ tags: 1 }, { unique: true });
postSchema.pre('validate', async function (next) {
    if (this.isNew || this.isModified('title')) {
        let baseSlug = (0, slugify_1.default)(this.title, { lower: true, strict: true });
        let slug = baseSlug;
        let counter = 1;
        while (await exports.PostModel.exists({ slug })) {
            slug = `${baseSlug}-${counter}`;
            counter++;
        }
        this.slug = slug;
    }
    next();
});
postSchema.virtual('comments', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'post'
});
postSchema.virtual('likes', {
    ref: 'Like',
    localField: '_id',
    foreignField: 'post'
});
exports.PostModel = mongoose_1.default.model("Post", postSchema);
//# sourceMappingURL=Post.js.map