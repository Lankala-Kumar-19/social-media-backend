"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDb = connectToDb;
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const uri = process.env.MONGO_URI;
// const dbName=process.env.MONGO_DB!;
// const client = new MongoClient(uri);
// let db: Db;
// export async function connectToDb():Promise<Db>{
//     if(!db){
//         await client.connect();
//         db= client.db(dbName);
//         console.log('connect to mongoDb');
//     }
//     return db;
// }
async function connectToDb() {
    try {
        await mongoose_1.default.connect(uri);
        console.log(`connected to mongoDb via mongoose`);
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
}
//# sourceMappingURL=mongoClient.js.map