const { sendMail } = require("../mail/sendMail");
const { File } = require("../models/file");

const cloudinary = require("cloudinary").v2;

module.exports.localFileUpload = async function (req, res) {
  try {
    const file = req.files.file;
    console.log("the file is ", file);
    const type = "." + file.name.split(".").at(-1);
    let path = __dirname + "/files/" + Date.now() + type;

    file.mv(path, (err) => {
      if (err) {
        console.log(err);
      }
    });
    res.json({
      success: true,
      message: "local file upload successfully",
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports.imageUpload = async function (req, res) {
  try {
    const file = req.files.file;
    let options = { folder: "narendra" };
    const response = await cloudinary.uploader.upload(
      file.tempFilePath,
      options
    );
    console.log(response);
    res.status(200).json({
      success: true,
      message: "upload successfully",
      data: response,
    });
  } catch (error) {
    console.log(error.message);
    res.status(200).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports.videoUpload = async function (req, res) {
  try {
    const file = req.files.file;
    const format = file.name.split(".").at(-1).toLowerCase();
    const support = ["mp4", "mov"];

    if (!support.includes(format)) {
      return res.status(200).json({
        success: false,
        message: "file format not supported",
      });
    }
    const response = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: "narendra",
      resource_type: "video",
      width: 640,
      height: 360,
      crop: "limit",
    });

    console.log(response);
    res.status(200).json({
      success: true,
      message: "upload successfully",
      data: response,
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports.imageReduceUpload = async function (req, res) {
  try {
    const {email} = req.body;
    const file = req.files.file;
    const format = file.name.split(".").at(-1).toLowerCase();
    const support = ["jpg", "jpeg", "png"];

    if (!support.includes(format)) {
      return res.status(200).json({
        success: false,
        message: "file format not supported",
      });
    }

    const response = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: "narendra",
      quality: 10,
    });
    console.log('cloud rs', response);

    const fileData = await File.create({
        email,
        imageUrl : response.secure_url
    })

    console.log("the file data is", fileData);

    res.status(200).json({
      success: true,
      message: "upload successfully",
      data: response,
      fileData
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: error.message,
    });
  }
};
