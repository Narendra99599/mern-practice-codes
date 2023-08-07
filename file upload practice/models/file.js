const mongoose = require('mongoose');
const { sendMail } = require('../mail/sendMail');

const UserSchema = new mongoose.Schema({
    imageUrl : String,
    email : String
})

UserSchema.pre('save',async function(next){
    let email = this.email;
    let imageUrl = this.imageUrl;
    if(this.isNew){
        await sendMail(email,'image url',imageUrl);
    }
    next();
})

module.exports.File = mongoose.model("File",UserSchema);