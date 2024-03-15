import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import http from 'http';
import pool from './database/db';
import authRouter from './routes/authRoutes'
import mailRouter from './routes/mailRoutes';
import initSocketServer from './websocketServer';
import applyMigrations from './database/migrations';

const app = express();
dotenv.config(); 

const connectToDB = async () => {
  try {
    await pool.connect();
  } catch (err) {
    console.log(err);
  }
};
connectToDB();
applyMigrations();

const httpServer = http.createServer(app)
export const io = initSocketServer(httpServer);

app.use(express.json());
app.use(authRouter);
app.use(mailRouter);

httpServer.listen(process.env.PORT)
