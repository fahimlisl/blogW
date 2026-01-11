import { Khutba } from "../models/khutba.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

const khutbaRegister = asyncHandler(async (req, res) => {

  const {title,url} = req.body;
  if(!(title && url)) throw new ApiError(400,"title and url must required");
  

  const khutba = await Khutba.create({
    title,
    url,
    likeC:0,
  });

  if (!khutba)
    throw new ApiError(
      500,
      "internal server error wasn't able to created khutba"
    );

  return res
    .status(200)
    .json(new ApiResponse(200, khutba, "khutba added successfully"));
});


const editKhutba = asyncHandler(async (req, res) => {
  const khutbaId = req.params.id;
  // const { title, description, sources } = req.body;
  const {title,url} = req.body
  const khutba = await Khutba.findByIdAndUpdate(khutbaId, {
    $set: {
      title,
      url
    },
  });
  if (!khutba)
    throw new ApiError(400, "wasn't able to update the desicred khutba");

  return res
    .status(200)
    .json(new ApiResponse(200, khutba, "khubta upated successfully"));
});

const removeKhutba = asyncHandler(async (req, res) => {
  const khubtaId = req.params.id;
  const khutba = await Khutba.findByIdAndDelete(khubtaId);

  if (!khutba) throw new ApiError(400, "wasn't able to delete the khubta !");

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "desired khutba deleted successfully"));
});

const fetchKhutbaList = asyncHandler(async (req, res) => {
  const list = await Khutba.find({});
  if (!list) {
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "no khubta has been added yet"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, list, "succesfully fetched all khubta"));
});

const fetchKhutba = asyncHandler(async (req, res) => {
  const khutbaId = req.params.id;
  const khubta = await Khutba.findById(khutbaId);
  if (!khubta)
    throw new ApiError(
      400,
      "wasn't able to found the particular khubta consisting the id"
    );
  return res
    .status(200)
    .json(new ApiResponse(200, khubta, "khubta fetched successfully"));
});

const increaseViewCount = asyncHandler(async(req,res) => {
  const khubtaId = req.params.id;
  const khubta = await Khutba.findByIdAndUpdate(khubtaId,
    {
      $inc:{
        viewC :1
      }
    },
    {
      new:true
    }
  );

  if(!khubta) throw new ApiError(500,"internal server error , while incrementing the view count");

  return res
  .status(200)
  .json(
    new ApiResponse(
      200,
      khubta,
      "view count incremented successfully"
    )
  )
})

export { khutbaRegister, editKhutba, removeKhutba ,fetchKhutbaList,fetchKhutba ,increaseViewCount};
