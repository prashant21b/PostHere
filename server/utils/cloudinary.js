const cloudinary = require('cloudinary').v2;
const fs=require('fs')


cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

exports.uploadOnCloudinary = async (localFilePath) => {
    try {
        console.log("13",localFilePath)
        if (!localFilePath) return null
        //upload the file on cloudinary
        cloudinary.uploader.upload(localFilePath,
        { public_id: "olympic_flag" }, 
        function(error, result) {console.log(result); });
        // file has been uploaded successfull
        console.log("file is uploaded on cloudinary ", response);
        fs.unlinkSync(localFilePath)
        return response;
        

    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}



