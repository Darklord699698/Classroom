import express from "express"
import cors from "cors"
import "dotenv/config"
import { connectDB } from "./src/config/db.js";

//app config
const app=express();
const port=4000;

//middlewares
app.use(express.json());
app.use(cors());

//db connection
connectDB();

//initialising routes
app.get('/',(req,res)=>{
    res.send("API Working")
})
app.listen(port,()=>{
    console.log(`Server started on https://localhost:${port}`)
})

//