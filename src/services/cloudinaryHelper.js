import dotenv from 'dotenv';
import { v2 } from 'cloudinary';

dotenv.config();

v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

/**
   * This method handle saving files to cloudinary storage.
   * @param {string} file a file properties.
   * @returns {object} a data.
   */
const uploadToCloudinary = async (file) => {
  try {
    const getDocName = file.originalFilename;
    const docLength = getDocName.length;
    const point = getDocName.lastIndexOf('.');
    const getExtensionFile = getDocName.substring(point, docLength);
    const lowCaseExtensionFile = getExtensionFile.toLowerCase();

    if (lowCaseExtensionFile === '.jpg' || lowCaseExtensionFile === '.png' || lowCaseExtensionFile === '.pdf') {
      const result = await v2.uploader.upload(file.path);

      const { url } = result;
      return url;
    }

    if (lowCaseExtensionFile === '.mp4' || lowCaseExtensionFile === '.mp3') {
      const result = await v2.uploader.upload(file.path,
        { resource_type: "video",
          chunk_size: 6000000,
          eager: [{ width: 300, height: 300, crop: "pad", audio_codec: "none" }, { width: 160, height: 100, crop: "crop", gravity: "south", audio_codec: "none" }],
          eager_async: true,
        });

      const { url } = result;
      return url;
    }
  } catch (error) {
    return error.name;
  }
};

export default uploadToCloudinary;
