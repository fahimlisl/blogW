import mongoose,{Schema} from "mongoose";


const ayahSchema = new mongoose.Schema({
    ayah:{
        type:String,
        // required:true // after testing make it required as true
    },
    shortMeaning:[ // there will be muitple objects bengali , english will depened
        {
            type:String,
        }
    ],
    explanation:{
        type:String,
    },
    reference:{ // may need to array as per requirement this part needs to get cahnge used cu
        type:String 
    }
},{timestamps:false})


const surahSema = new mongoose.Schema({
    name:{
        type:String
    },
    ayahs:{
        type:[ayahSchema] // lets see wheather its possible to add value via external api endpoint
    },
    surahList:{
        type: Schema.Types.ObjectId,
        ref:"SurahList",
        index:true
    },
    isCompleted:{
        type:Boolean,
        default:false
    }
},{timestamps:true})



export const Surah = mongoose.model("Surah",surahSema)