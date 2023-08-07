const mongoose  = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    gender : String,
    dateOfBirth : String,
    about : String,
    contactNumber : Number
});

const Profile = mongoose.model("Profile",ProfileSchema);

module.exports.Profile = Profile;