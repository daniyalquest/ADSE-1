import express from 'express';
import connectDB from './Config/db.js';
import dotenv from 'dotenv';
import userRoutes from './Routes/UserRoutes.js';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT;

connectDB();
app.use(cors());
app.use(express.json());
app.get('/', (_, res) => {
  res.send(`Server is running on port ${port}`);
});
app.use('/api/users', userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});