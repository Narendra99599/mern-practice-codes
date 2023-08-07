const mongoose = require('mongoose');

const dbConnect = ()=>{
    mongoose.connect("mongodb://0.0.0.0:27017/newpractice")
        .then(() => console.log("db connected successfully"))
        .catch((error) => console.log("erro while connecting to database" , error.message));
}

module.exports.dbConnect = dbConnect;