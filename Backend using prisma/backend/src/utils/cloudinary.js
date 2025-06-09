const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config(
{
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
}
);

const uploadVideo = async (file) => 
{
  try 
  {
    const result = await cloudinary.uploader.upload(file.path, 
    {
      resource_type: 'video',
      folder: 'course_videos',
    });
    console.log('Video uploaded to Cloudinary:', result.secure_url);
    return result.secure_url;
  } 
  catch (error) 
  {
    console.error('Error uploading to Cloudinary:', error);
    throw new Error('Failed to upload video to Cloudinary');
  }
};

module.exports = { uploadVideo };