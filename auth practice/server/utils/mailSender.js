const nodemailer = require('nodemailer');
require('dotenv').config();

async function mailSender(email,title,body){
    try{
        let transporter = nodemailer.createTransport({
            host : process.env.MAIL_HOST,
            auth : {
                user : process.env.MAIL_USER,
                pass : process.env.MAIL_PASS
            },
            secure : false,
        })

        let info = await transporter.sendMail({
            from : process.env.MAIL_USER,
            to : email,
            subject : title,
            text : body
        })

        console.log(info.response);

        return info;

    }catch(error){
        console.log(error.message);
        return error.message;
    }
}

module.exports.mailSender = mailSender;