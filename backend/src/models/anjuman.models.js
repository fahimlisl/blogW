import mongoose from "mongoose";

const anjumanSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
    },
    viewC:{
        type:Number,
        default:0
    }
},{timestamps:true})



export const Anjuman = mongoose.model("Anjuman",anjumanSchema)