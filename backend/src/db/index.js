import mongoose from "mongoose";
import { DBURL } from "../constant.js";

let isConnected = false; // ক্যাশিং করার জন্য একটি ফ্ল্যাগ

export const dbConnect = async () => {
    if (isConnected) {
        console.log("✅ Using existing MongoDB connection");
        return;
    }

    try {
        const db = await mongoose.connect(DBURL); // No need to pass deprecated options

        isConnected = db.connections[0].readyState;
        console.log("🚀 MongoDB Connected Successfully");
    } catch (error) {
        console.log("❌ MongoDB Connection Error:", error);
        throw new Error("Database connection failed");
    }
};