import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadToCloudinary = async (file) => {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: 'auto',
    folder: 'question-papers'
  });
  return result.secure_url;
};

export default cloudinary;