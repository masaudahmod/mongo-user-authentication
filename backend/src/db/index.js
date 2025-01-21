import mongoose from "mongoose";
import { DBURL } from "../constant.js";

export const dbConnect = async () =>{
    try {
        await mongoose.connect(DBURL)        
        console.log('DB connected');
    } catch (error) {
        console.log("DB", error);
    }
}