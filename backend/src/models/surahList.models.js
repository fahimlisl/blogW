import mongoose,{Schema} from "mongoose";

const surahListSchema = new mongoose.Schema(
  {
    number: {
      type: Number,
      index:true,
      unique:true,
      required:true
    },
    name: {
      type: String,
      index:true
    },
    englishName: {
      type: String,
      index:true
    },
    numberOfAyahs: {
      type: Number,
    },
  },
  { timestamps: false }
);

export const SurahList = mongoose.model("SurahList", surahListSchema);
