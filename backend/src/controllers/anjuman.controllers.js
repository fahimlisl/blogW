import { Anjuman } from "../models/anjuman.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

const anjumanRegister = asyncHandler(async (req, res) => {

  const {title,url} = req.body;
  if(!(title && url)) throw new ApiError(400,"title and url must required");
  

  const anjuman = await Anjuman.create({
    title,
    url,
    likeC:0,
  });

  if (!anjuman)
    throw new ApiError(
      500,
      "internal server error wasn't able to created anjuman"
    );

  return res
    .status(200)
    .json(new ApiResponse(200, anjuman, "anjuman added successfully"));
});


const editAnjuman = asyncHandler(async (req, res) => {
  const anjumanId = req.params.id;
  // const { title, description, sources } = req.body;
  const {title,url} = req.body
  const anjuman = await Anjuman.findByIdAndUpdate(anjumanId, {
    $set: {
      title,
      url
    },
  });
  if (!anjuman)
    throw new ApiError(400, "wasn't able to update the desicred anjuman");

  return res
    .status(200)
    .json(new ApiResponse(200, anjuman, "anjuman upated successfully"));
});

const removeAnjuman = asyncHandler(async (req, res) => {
  const khubtaId = req.params.id;
  const anjuman = await Anjuman.findByIdAndDelete(khubtaId);

  if (!anjuman) throw new ApiError(400, "wasn't able to delete the anjuman !");

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "desired anjuman deleted successfully"));
});

const fetchAnjumanList = asyncHandler(async (req, res) => {
  const list = await Anjuman.find({});
  if (!list) {
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "no anjuman has been added yet"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, list, "succesfully fetched all anjuman"));
});

const fetchAnjuman = asyncHandler(async (req, res) => {
  const anjumanId = req.params.id;
  const anjuman = await Anjuman.findById(anjumanId);
  if (!anjuman)
    throw new ApiError(
      400,
      "wasn't able to found the particular anjuman consisting the id"
    );
  return res
    .status(200)
    .json(new ApiResponse(200, anjuman, "anjuman fetched successfully"));
});

const increaseViewCountAnjuman = asyncHandler(async(req,res) => {
  const anjumanId = req.params.id;
  const anjuman = await Anjuman.findByIdAndUpdate(anjumanId,
    {
      $inc:{
        viewC :1
      }
    },
    {
      new:true
    }
  );

  if(!anjuman) throw new ApiError(500,"internal server error , while incrementing the view count");

  return res
  .status(200)
  .json(
    new ApiResponse(
      200,
      anjuman,
      "view count incremented successfully"
    )
  )
})

export { anjumanRegister, editAnjuman, removeAnjuman ,fetchAnjumanList,fetchAnjuman ,increaseViewCountAnjuman};
