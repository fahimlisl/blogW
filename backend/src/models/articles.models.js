import mongoose from "mongoose";

const articlesSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    sources:{
        type:String,
    },
    // author // optional
},{timestamps:true})


export const Article = mongoose.model("Article",articlesSchema)