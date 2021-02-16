import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import allRoutes from './routes';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api', allRoutes);
app.get('**', (req, res) => res.status(200).json({ status: 200, data: 'Welcome to Heritage Backend' }));

dotenv.config();
const port = process.env.PORT;
app.listen(port, () => { console.log('Server Started on', port); });

export default app;
