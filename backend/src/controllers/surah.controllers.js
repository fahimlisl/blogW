import { Surah } from "../models/surah.models.js";
import { SurahList } from "../models/surahList.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import axios from "axios";

//this api will be called once , due to creation of all
const additionOfSurahNamesAndAyats = asyncHandler(async (req, res) => {
  const response = await axios.get("http://api.alquran.cloud/v1/surah");
  const data = response.data.data;

  const surahs = data.map((s) => ({
    name: s.name,
    number: s.number,
    englishName: s.englishName,
    numberOfAyahs: s.numberOfAyahs,
  }));

  await SurahList.insertMany(surahs, { ordered: false });

  const surahlistsfromdb = await SurahList.find({});

  const mainSurah = surahlistsfromdb.map((s) => ({
    name: s.name,
    surahList: s._id,
    ayahs: [],
  }));

  await Surah.insertMany(mainSurah, { ordered: false });

  return res
    .status(200)
    .json(
      new ApiResponse(200, {}, "successfully added all surahlist and surahs")
    );
});

const adiddionOfAyahs = asyncHandler(async (req, res) => {
  const response = await axios.get(
    `https://api.alquran.cloud/v1/quran/en.sahih`
  );
  const responseQ = await axios.get(`https://api.alquran.cloud/v1/quran`);
  const finalEnglish = response.data.data.surahs;
  const finalArabic = responseQ.data.data.surahs;

  const surahs = await Surah.find({});

  for (const s of surahs) {
    const listOfSurah = await SurahList.findById(s.surahList);
    for (let ayah = 1; ayah <= listOfSurah.numberOfAyahs; ayah++) {
      const finArab = finalArabic[listOfSurah.number - 1].ayahs[ayah - 1].text;
      const finEng = finalEnglish[listOfSurah.number - 1].ayahs[ayah - 1].text;

      await Surah.updateOne(
        { surahList: listOfSurah._id },
        {
          $push: {
            ayahs: {
              ayah: finArab,
              shortMeaning: [finEng],
              explanation: "",
            },
          },
        }
      );
    }
  }

  return res.status(200).json(new ApiResponse(200, {}, "succeded"));
});

const fetchSurahList = asyncHandler(async (req, res) => {
  const lists = await SurahList.find({});
  if (!lists)
    throw new ApiError(400, "surah list is empty , need to add surahs");
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        lists,
        "lists of surahs have been successfully fetched"
      )
    );
});

const fetchSurah = asyncHandler(async (req, res) => {
  const surahListId = req.params.id;
  const surah = await Surah.findOne({ surahList: surahListId });
  if (!surah) throw new ApiError(400, "surah wasn't able found");

  return res
    .status(200)
    .json(new ApiResponse(200, surah, "fetched particular surah successfully"));
});

const editExplanationAyah = asyncHandler(async (req, res) => {
  const ayahId = req.params.id;
  const { explanation } = req.body;
  if(!explanation) throw new ApiError(400,"explanation must required!");
  const ayah = await Surah.findOneAndUpdate(
    {
      "ayahs._id":ayahId
    },
    {
      $set:{
        "ayahs.$.explanation" : explanation
      }
    },
    {
      new:true
    }
  );

  if(!ayah) throw new ApiError(400,"wasn't able to update ayah explanation or maybe ayah not found")

  return res
    .status(200)
    .json(new ApiResponse(200, ayah, "fetched successfylly"));
});

const addShortmeaning = asyncHandler(async(req,res) => {
  const ayahId = req.params.id;
  const { shortMeaning } = req.body;
  const ayah = await Surah.findOneAndUpdate(
    {
      "ayahs._id":ayahId
    },
    {
      $push:{
        "ayahs.$.shortMeaning":shortMeaning
      },
    },
    {
      new:true
    }
  )
  if(!ayah) throw new ApiError(400,"faield to update ayah shortmeaing")
  return res
  .status(200)
  .json(new ApiResponse(200,ayah,"upated short Meaning finally"))
})


// for whole surah
const isPending = asyncHandler(async(req,res) => {

})

const isAyahPending = asyncHandler(async(req,res) => {
  
})

export {
  additionOfSurahNamesAndAyats,
  adiddionOfAyahs,
  editExplanationAyah,
  fetchSurah,
  fetchSurahList,
  addShortmeaning
};