import {v2 as cloudinary} from 'cloudinary';
import dotenv from "dotenv"
import fs from "fs"

dotenv.config({
    path:"./.env"
})


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
  api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET
});


const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null;
        const response = await  cloudinary.uploader.upload(localFilePath,{
            resource_type:'auto'
        })


        fs.unlinkSync(localFilePath)
        console.log(`image is finally uploaded to cloudinary and finally deleted from local stroage , gotta change this to buffer while putting it to produciton!`);
        return response;
        
    } catch (error) {
        if(fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath)
            console.log(`image is fainnly deleted from local stroage due to error occured in cloudinary file`);
        }
        // if() // gotta write another logic to delete file form cloudinary in case
        return null;
    }
}


export {uploadOnCloudinary}