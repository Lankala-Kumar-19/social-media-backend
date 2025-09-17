
import dotenv from 'dotenv';
import mongoose from "mongoose";

dotenv.config();

const uri = process.env.MONGO_URI!;
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

export async function connectToDb(){
    try{
        await mongoose.connect(uri);
        console.log(`connected to mongoDb via mongoose`);
    }catch(err){
        console.error(err);
        process.exit(1);
    }
}