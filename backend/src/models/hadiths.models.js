import mongoose from "mongoose";

const hadithSchema = new mongoose.Schema({},{timestamps:true})



export const Hadith = mongoose.model("Hadith",hadithSchema)