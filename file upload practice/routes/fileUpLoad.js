const express = require("express");
const {
  localFileUpload,
  imageUpload,
  videoUpload,
  imageReduceUpload,
} = require("../controllers/fileUpload");
const router = express.Router();

router
  .get("/", (req, res) => {
    res.send("this is home page ");
  })
  .post("/localFileUpload", localFileUpload)
  .post("/imageUpload", imageUpload)
  .post("/videoUpload", videoUpload)
  .post("/imageReduceUpload", imageReduceUpload);

exports.router = router;
