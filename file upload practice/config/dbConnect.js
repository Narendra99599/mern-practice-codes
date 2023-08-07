const mongoose = require("mongoose");
require("dotenv").config();

module.exports.dbConnect = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("db connected successfully"))
    .catch((error) => console.log(error.message));
};
