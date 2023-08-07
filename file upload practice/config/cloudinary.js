const cloudinary = require("cloudinary").v2;

module.exports.cloudnaryConnect = () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.api_secret,
    });
    console.log("cloudinary connected successfully");
  } catch (error) {
    console.log(error.message);
  }
};
