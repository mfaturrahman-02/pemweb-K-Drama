import express from 'express';
import path from 'path';
import cors from 'cors';
import dramaRoutes from './routes/dramaRoutes';
import { loggerMiddleware } from './middleware/dramaMiddleware';

const app = express();


app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);


app.use(express.static(path.join(__dirname, '../public')));


app.use('/api/dramas', dramaRoutes);

export default app;
