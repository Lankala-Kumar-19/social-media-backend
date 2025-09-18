import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import postRoutes from './routes/postRoutes';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/users',userRoutes);
app.use('/posts',postRoutes);
export default app;