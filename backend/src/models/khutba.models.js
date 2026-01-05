import mongoose from "mongoose";

const khutbaSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    count:{
        type:Number // will be calculated from databse via controller indexing , alike --> "(khutba - count)"
    }, // thining to implimentation of bengali to english translation automatically via ai
    description:{
        type:String,
        required:true
    },
    // dateOfRelease:{
    //     type:Date // will be taken vai timestamps via controller logic automatcally and also that bar thing will be calculated automatically , and also will be showinig created and updated at like , posted on , and for that updated at will be using , last updated 
    // },
    sources:{
        type:String // later will be implemented as array , cuz to main the data properly and in proper manner
    }
},{timestamps:true})



export const Khutba = mongoose.model("Khutba",khutbaSchema)