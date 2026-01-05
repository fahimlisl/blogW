import mongoose from "mongoose";
import {DB_NAME} from "../constants.js"

export const connectDB = async() => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log("mongodb connection successful");
        
    } catch (error) {
        console.log(error)
        process.exit(1);
    }
}