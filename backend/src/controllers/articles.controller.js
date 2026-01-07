import { Article } from "../models/articles.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

const registerArticle = asyncHandler(async(req,res) => {
    const {title,description,sources} = req.body;
    if ([title ,description].some((t) => !t && t !== 0 )) throw new ApiError(400,"both fields are must required")
    
    const createArticle = await Article.create({
        title,
        description,
        sources : sources || ""
    })

    if(!createArticle) throw new ApiError(400,"wasn't able to create article")
    
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            createArticle,
            "article created successfully"
        )
    )
})

const editArticle = asyncHandler(async(req,res) => {
    const articleId = req.params.id;
    const {title,description,sources} = req.body;
    // const arti = await Article.findById(articleId)
    const article = await Article.findByIdAndUpdate(articleId,
        {
            // maybe we don't need twice api call right now , we can makeit happen via one call only gotta reverifyt the query format
            $set:{
                title:title,
                description:description,
                // sources:sources || arti.sources
                sources:sources
            }
        }
    );
    
    if(!article) throw new ApiError(500,"internal server error or not found the desired article")

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            article,
            "updated successfully"
        )
    )
})


const removeArticle = asyncHandler(async(req,res) => {
    const articleId = req.params.id;
    const article = await Article.findByIdAndDelete(articleId);
    if(!article) throw new ApiError(400,"article wasn't able to found")
        // will be adding validation as per future requireemnts
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {},
            "article deleted successfully"
        )
    )
})

const fetchArticleList = asyncHandler(async(req,res) => {
    const list = await Article.find({}) // no of article will be counted via fronted logic
    if(!list) {
        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "no artcile has been published yet"
            )
        )
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            list,
            "articles has been fetched successfully"
        )
    )
})

const fetchArticle = asyncHandler(async(req,res) => {
    const articleId = req.params.id;
    const article = await Article.findById(articleId);
    if(!article) throw new ApiError(400,"article assigned with the particular id wasn't able to found")
    
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            article,
            `article with the following id ${articleId} fetcehd successfully`
        )
    )
})

export {registerArticle,editArticle,removeArticle,fetchArticleList,fetchArticle}