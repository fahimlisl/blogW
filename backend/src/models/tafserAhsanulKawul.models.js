import mongoose from "mongoose";

const tafserAhsanulKawulSchema = new mongoose.Schema({
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



export const TafserAhsanulKawul = mongoose.model("TafserAhsanulKawul",tafserAhsanulKawulSchema)