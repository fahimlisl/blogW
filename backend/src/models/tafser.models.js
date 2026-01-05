import mongoose from "mongoose";

const tafserSchema = new mongoose.Schema({},{timestamps:true})

export const Tafser = mongoose.model("Tafser",tafserSchema)