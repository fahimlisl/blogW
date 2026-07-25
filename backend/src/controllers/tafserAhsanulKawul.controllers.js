import { TafserAhsanulKawul } from "../models/tafserAhsanulKawul.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

const tafserAhsanulKawulRegister = asyncHandler(async (req, res) => {

  const {title,url} = req.body;
  if(!(title && url)) throw new ApiError(400,"title and url must required");
  

  const tafserAhsanulKawul = await TafserAhsanulKawul.create({
    title,
    url,
    likeC:0,
  });

  if (!tafserAhsanulKawul)
    throw new ApiError(
      500,
      "internal server error wasn't able to created tafserAhsanulKawul"
    );

  return res
    .status(200)
    .json(new ApiResponse(200, tafserAhsanulKawul, "tafserAhsanulKawul added successfully"));
});


const edittafserAhsanulKawul = asyncHandler(async (req, res) => {
  const tafserAhsanulKawulId = req.params.id;
  // const { title, description, sources } = req.body;
  const {title,url} = req.body
  const tafserAhsanulKawul = await TafserAhsanulKawul.findByIdAndUpdate(tafserAhsanulKawulId, {
    $set: {
      title,
      url
    },
  });
  if (!tafserAhsanulKawul)
    throw new ApiError(400, "wasn't able to update the desicred tafserAhsanulKawul");

  return res
    .status(200)
    .json(new ApiResponse(200, tafserAhsanulKawul, "tafserAhsanulKawul upated successfully"));
});

const removetafserAhsanulKawul = asyncHandler(async (req, res) => {
  const tafserAhsanulKawulId = req.params.id;
  const tafserAhsanulKawul = await TafserAhsanulKawul.findByIdAndDelete(tafserAhsanulKawulId);

  if (!tafserAhsanulKawul) throw new ApiError(400, "wasn't able to delete the tafserAhsanulKawul !");

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "desired tafserAhsanulKawul deleted successfully"));
});

const fetchtafserAhsanulKawulList = asyncHandler(async (req, res) => {
  const list = await TafserAhsanulKawul.find({});
  if (!list) {
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "no tafserAhsanulKawul has been added yet"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, list, "succesfully fetched all tafserAhsanulKawul"));
});

const fetchtafserAhsanulKawul = asyncHandler(async (req, res) => {
  const tafserAhsanulKawulId = req.params.id;
  const tafserAhsanulKawul = await TafserAhsanulKawul.findById(tafserAhsanulKawulId);
  if (!tafserAhsanulKawul)
    throw new ApiError(
      400,
      "wasn't able to found the particular tafserAhsanulKawul consisting the id"
    );
  return res
    .status(200)
    .json(new ApiResponse(200, tafserAhsanulKawul, "tafserAhsanulKawul fetched successfully"));
});

const increaseViewCountOfTafserAhasanulKawul
 = asyncHandler(async(req,res) => {
  const tafserAhsanulKawulId = req.params.id;
  const tafserAhsanulKawul = await TafserAhsanulKawul.findByIdAndUpdate(tafserAhsanulKawulId,
    {
      $inc:{
        viewC :1
      }
    },
    {
      new:true
    }
  );

  if(!tafserAhsanulKawul) throw new ApiError(500,"internal server error , while incrementing the view count");

  return res
  .status(200)
  .json(
    new ApiResponse(
      200,
      tafserAhsanulKawul,
      "view count incremented successfully"
    )
  )
})

export { tafserAhsanulKawulRegister, edittafserAhsanulKawul, removetafserAhsanulKawul ,fetchtafserAhsanulKawulList,fetchtafserAhsanulKawul ,increaseViewCountOfTafserAhasanulKawul};
