const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service : 'Gmail',
    auth : {
        user : 'narendrarokkam256@gmail.com',
        pass : 'kcauhnwdivkplmul'
    }
})

module.exports.transporter = transporter;