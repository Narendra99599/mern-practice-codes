const { transporter } = require("../config/sendMail")

module.exports.sendMail = async function(email, subject , content){
    try{
        const response = await transporter.sendMail({
            from : 'narendrarokkam256@gmail.com',
            to : email,
            subject : subject,
            text : content
        })
        console.log(response);
        return response;
    }catch(error){
        console.log(error.message);
        return error;
    }
}