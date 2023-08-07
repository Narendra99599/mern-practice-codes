const express = require('express');
const { login, signUP, sendOtp, resetPasswordToken, resetPassword } = require('../controllers/signup');
const router = express.Router();

router.get('/',(req,res)=>{
    res.send("this is home page at version with api name");
})


router.post("/login",login);
router.post("/signup",signUP);
router.post("/otpGenerator",sendOtp);
router.post('/resetPasswordToken',resetPasswordToken);
router.post('/resetPassword/:id',resetPassword);

module.exports.router = router;