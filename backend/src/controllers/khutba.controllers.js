import { Khutba } from "../models/khutba.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

const khutbaRegister = asyncHandler(async (req, res) => {
  // const { title, description, sources } = req.body;
  // if (!(title && description))
  //   throw new ApiError(400, "title and description fields are must required");

  const {title,url} = req.body;
  if(!(title && url)) throw new ApiError(400,"title and url must required");
  // trying to procded with this method , cuz this will enhance admin experinece
  const count = await Khutba.find({}).countDocuments();

  const khutba = await Khutba.create({
    title,
    // description,
    url,
    // dateOfRelease, // no need to save date of release , cuz ill be using that from frnted , for the reflection and the impletion via createdAt and updatedAt
    count:(count+1),
    // sources: sources || "",
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
      // description, // will be using thing kinda thing if this gives a valid error for auto resent the value to null "description : description || khutbaagain.description , (will be needing to have 2 api call)
      // sources,
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

export { khutbaRegister, editKhutba, removeKhutba ,fetchKhutbaList,fetchKhutba};
