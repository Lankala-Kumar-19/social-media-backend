import app from './app';
import { connectToDb } from './mongoClient';


const PORT = process.env.PORT || 5000;

async function startServer() {
    await connectToDb();
    app.listen(PORT,()=>{
        console.log(`server running on http://localhost:${PORT}`);
            
    });
}

startServer();