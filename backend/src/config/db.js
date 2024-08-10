import mongoose from "mongoose";

export const connectDB=async()=>{
    await mongoose.connect('mongodb+srv://ujjwal:thalaforareason@cluster0.wjxy0af.mongodb.net/classroom').then(()=>console.log("DB CONNECTED"));
}