import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import db from './config/db.js';
import todoRoutes from './routes/todoRoutes.js';
import userRoutes from './routes/userRoutes.js';
import operationRoute from './routes/operationRoutes.js';

const app = express();
dotenv.config();
db();

app.use(cors());
app.use(express.json());

app.use('/api/todos', todoRoutes);
app.use('/api/users', userRoutes);

app.use('/api/operation', operationRoute);

app.get('/', (req, res) => {
  res.send('Api gesendet');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App gestartet am ${PORT}`);
});
