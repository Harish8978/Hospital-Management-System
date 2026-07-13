import {v2 as cloudinary} from "cloudinary";
import fs from "fs";

// configure cloudinary
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
});

// to upload files to the cloudinary
export async function uploadtoCloudinary(filePath,folder="Doctor"){
    try{
        const result = await cloudinary.uploader.upload(filePath,{
            folder,
            resource_type:"image"
        });
        // to remove file in local atfer uploading
        fs.unlinkSync(filePath);
        return result
    }catch(error){
        console.error("Cloudinary Upload error",error.message);
        throw error;
    }
}

// to delete the image in cloudinary
export async function deleteFromCloudinary(publicId){
    try {
        if(publicId){
            await cloudinary.uploader.destroy(publicId)
        }
    } catch (error) {
        console.error("Cloudinary delete Error:",error.message);
        throw error;
    }
}

export default cloudinary