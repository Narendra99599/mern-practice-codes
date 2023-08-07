const mongoose = require("mongoose");
const { mailSender } = require("../utils/mailSender");

const OtpSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
    },
    otp : {
        type : String,
        required : true,
    },
    createdAt : {
        type : Date,
        default : Date.now,
        expires : 60*5,
    }
})

async function sendVerificaitonEmail(email,otp){
    try{
        let mailResponse = await mailSender(email,"verification email",otp);
        console.log("email sent successfully",mailResponse.response);
    }catch(error){
        console.log("Error occurred while sending email: ", error);
		throw error;
    }
}


OtpSchema.pre("save",async function(next) {
    console.log("New Document is Saved in otp model");
    if(this.isNew){
        await sendVerificaitonEmail(this.email,this.otp);
    }
    next();
})

module.exports.Otp = mongoose.model("Otp",OtpSchema);