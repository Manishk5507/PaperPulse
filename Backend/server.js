import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from './config/db.js';
import { errorHandler } from './middleware/error.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use("/", (req, res) => {
  res.send("Welcome to PaperPulse"); 
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
