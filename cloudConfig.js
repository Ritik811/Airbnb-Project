const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");


cloudinary.config({
  cloud_name: process.env.COULD_NAME,
  api_key: process.env.COULD_API_KEY,
  api_secret: process.env.COULD_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "wandlust_Dev",
    allowed_formats: ["jpeg", "png", "jpg","webp"],
  },
});

module.exports = {
  cloudinary,
  storage,
};
