import express from "express"; //type:module
// const  express=require("express") //type: commonjs
import dotenv from "dotenv";
import userRouter from "./routes/user.routes.js";
import taskRouter from "./routes/task.routes.js";
import mongoose from "mongoose";
import connectToMongoDB from "./db/connectToMongoDB.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;


app.use(express.json()); 
app.use(cors({
  origin: 'http://localhost:5173',
  credentials:true,
}));
app.use("/api/auth",userRouter);
app.use("/api/auth",taskRouter);

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`server is running on port ${PORT}`);
});
