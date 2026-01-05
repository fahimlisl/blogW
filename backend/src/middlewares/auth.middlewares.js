import jwt from "jsonwebtoken"
import { Admin } from "../models/admin.models.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.models.js"

const roleMap = {
    user : User,
    admin: Admin
}

export const verifyJWT = async(req,_,next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","");
        if(!token) throw new ApiError(500, "unauthroize access");
        const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN);
        if (!decodedToken) throw new ApiError(400, "user not verified")
        const Model = roleMap[decodedToken.role]
        // everytiime must have to add role in accessToken of model
        const user = await Model.findById(decodedToken?._id).select("-password -refreshToken");
        if(!user) throw new ApiError(402,"something went wrong while finding user , via verify JWT thing");
        req.user = user;
        next()
    } catch (error) {
        throw new ApiError(401,error.message || "someting went wrong while encoutirng verifyJWT attempt")
    }
}

// will remove before putting on production

// export const verifyJWT = async(req,_,next) => {
//     try {
//         const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","");
//         if(!token) throw new ApiError(401,"unauthorized access cuz , the token isn't recived by the auth middleware")
//         const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN)
//         if(!decodedToken) throw new ApiError(401,"user not verified")
//         const user = await Admin.findById(decodedToken?._id).select("-password -refreshToken")
//         if(!user) throw new ApiError(402,"something went wrong , while finding user")
//         req.user = user;
//         next()
//     } catch (error) {
//         throw new ApiError(401,error.message || "something went wrong , while encountering verifyJWT attempt")
//     }
// }