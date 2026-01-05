import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { generateAccessAndRefreshToken } from "../utils/generateAccessAndRefreshToken.js";
import { options } from "../utils/options.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { User } from "../models/user.models.js";

const registerUser = asyncHandler(async(req,res) => {
    const {username,password,email,phoneNumber,profilePhoto} = req.body;    
    if(
        [
            username,
            password,
            email,
            phoneNumber
        ].some((t) => !t && t !== 0)
    ){
        throw new ApiError(
            400,
            "all fields are required"
        )
    }
    const checkUser = await User.findOne({
        $or:[
            {email},{phoneNumber}
        ]
    })
    if(checkUser) throw new ApiError(400,"user already exits")

    const photo = req.file?.path
    console.log(`log of profilephoto ${photo}`);
    const photoFileUpload = await uploadOnCloudinary(photo)
    if(!photo) throw new ApiError(400,"profile photo must required!!")


    const createdUser = await User.create({
        email,
        password,
        phoneNumber,
        username,
        profilePhoto : photoFileUpload.url
    })

    const response = await User.findById(createdUser._id).select("-password -refreshToken")
    if(!response) throw new ApiError(500,"unabel to crete user , internal server error")

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            response,
            "just retriving data to test the modules and everything will need to change everything a lil later"
        )
    )
    
})

const loginUser = asyncHandler(async(req,res) => {
    const {email,phoneNumber,password} = req.body;
    console.log(!(email || phoneNumber))
    if(!(email || phoneNumber)) throw new ApiError(400,"atleast one field is required")
    if(!password) throw new ApiError(400,"password must required")

    const user = await User.findOne({
        $or:[
            {email},{phoneNumber}
        ]
    }) // can use select to send only resitricted response
    if(!user) throw new ApiError(400,"user wasn't able to found")
    const checkPassword = await user.isPasswordCorrect(password)
    if(!checkPassword) throw new ApiError(400,"crednetials doesn't match")
    
    const {accessToken , refreshToken} = await generateAccessAndRefreshToken(user._id,User)

    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(
            200,
            user,
            "user logged in successfully"
        )
    )
})   


const logOutUser = asyncHandler(async(req,res) => {
    const userId = req.user._id;
    console.log(`gettign log of userId from middleware ${userId}`);
    const user = await User.findByIdAndUpdate(
        userId,
        {
            $unset:{
                refreshToken: ""
            },
        },
        {
            new:true
        }
    )
    if(!user) throw new ApiError(400,"unauthorized access")
    
    return res
    .status(200)
    .clearCookie("refreshToken",options)
    .clearCookie("accessToken",options)
    .json(
        new ApiResponse(
            200,
            {},
            "user logged out successfully"
        )
    )
    
})


export {registerUser,loginUser,logOutUser}