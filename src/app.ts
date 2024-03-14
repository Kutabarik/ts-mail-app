import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import pool from './database/db';
import authRouter from './routes/authRoutes'
import mailRouter from './routes/mailRoutes';


const app = express();
dotenv.config(); 

app.listen(process.env.PORT, () => {
  console.log(process.env.DB_HOST);
  console.log(`Server is running at ${process.env.PORT}`);
});

const connectToDB = async () => {
  try {
    await pool.connect();
  } catch (err) {
    console.log(err);
  }
};
connectToDB();

app.use(express.json());
app.use(authRouter);
app.use(mailRouter);