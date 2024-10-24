
import http from "http";
import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";
import cors from "cors";

const app = express();
dotenv.config();
app.use(bodyParser.json({limit:"50mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"50mb",extended:true}));

app.use(cors({origin:"*"}));

app.use("/auth",userRouter);

app.use("/",(req,res)=> {
    res.send("Google form is working. Please");
})

mongoose.connect(process.env.MONGODB_URI,{dbName:"form"}).then(()=> console.log("mongodb is connected")).catch((error)=> console.log(error));

app.listen(process.env.PORT,()=> console.log(`Server running on port ${process.env.PORT}`));


