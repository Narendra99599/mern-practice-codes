const { Otp } = require("../models/otp");
const { Profile } = require("../models/profile");
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const otpGenerator = require("otp-generator");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { mailSender } = require("../utils/mailSender");

module.exports.signUP = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role, otp, confirmPassword } =
      req.body;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !role ||
      !otp ||
      !confirmPassword
    ) {
      return res.status(200).json({
        success: false,
        message: "enter all details",
      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "user already exits",
      });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password missmatch",
      });
    }

    const otpResponse = await Otp.find({ email })
      .sort({ createdAt: -1 })
      .limit(1);
    if (otpResponse.length == 0) {
      return res.status(400).json({
        success: false,
        message: "otp validity expired",
      });
    }

    if (otp !== otpResponse[0].otp) {
      return res.status(400).json({
        success: false,
        message: "otp missmatch",
      });
    }

    let hasspw;
    try {
      hasspw = await bcrypt.hash(password, 10);
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "error while bcrypting the password",
      });
    }
    const profileDetails = await Profile.create({
      gender: "",
      dateOfBirth: "",
      about: "",
      contactNumber: "",
    });
    const user = await User.create({
      firstName,
      lastName,
      password: hasspw,
      email,
      additionalDetails: profileDetails._id,
      role,
    });
    return res.status(200).json({
      success: true,
      message: "user has successfully registerd in",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(200).json({
        success: false,
        message: "enter valid email and password",
      });
    }
    const existingUser = await User.findOne({ email }).populate("additionalDetails").exec();
    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "user is doesnt exits please signup",
      });
    }
    let compareResult = await bcrypt.compare(password, existingUser.password);
    if (compareResult) {
      let payload = {
        email: existingUser.email,
        id: existingUser._id,
        role: existingUser.role,
      };
      const token = jwt.sign(payload, "Narendra@145", {
        expiresIn: "24h",
      });

      existingUser.token = token;
      existingUser.password = undefined;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      res.cookie("token", token, options).status(200).json({
        success: true,
        message: "user login successfully",
        token: token,
        user: existingUser,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: `Password is incorrect`,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Login Failure Please Try Again`,
      error: error.message,
    });
  }
};

module.exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    console.log("your email in api si ",email);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(200).json({
        success: false,
        message: "user already registerd",
      });
    }
    let otp = otpGenerator.generate(6, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    let otpBody = await Otp.create({ email, otp });
    res.status(200).json({
      success: true,
      message: "opt has been sent successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports.resetPasswordToken = async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return res.status(200).json({
        success: false,
        message: "user should singup first",
      });
    }
    const randomKey = crypto.randomBytes(20).toString("hex");

    const updateUserDetails = await User.findOneAndUpdate(
      { email: email },
      {
        token: randomKey,
        resetPasswordExpires: Date.now() + 5 * 60 * 1000,
      },
      { new: true }
    );

    console.log("updated details is ", updateUserDetails);
    let baseUrl = `http://localhost:4000/api/v1/update-password/${randomKey}`;

    await mailSender(email, "reset password url", baseUrl);

    res.status(200).json({
      success: true,
      message: "reset password link has been sent to your email",
      token: baseUrl,
    });
  } catch (error) {
    return res.json({
      error: error.message,
      success: false,
      message: `Some Error in Sending the Reset Message`,
    });
  }
};

module.exports.resetPassword = async (req, res) => {
  try {
    const { password, confirmPassword, token } = req.body;
    if (!password || !confirmPassword || !token) {
      return res.status(400).json({
        success: false,
        message: "enter complete details",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "password missmatch",
      });
    }

    const user = await User.findOne({ token: token });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user token not found",
      });
    }

    if (Date.now() > user.resetPasswordExpires) {
      return res.status(400).json({
        success: false,
        message: "token is expired you should generate new token",
      });
    }

    let hashpw = await bcrypt.hash(password, 10);

    let updatedPassword = await User.findOneAndUpdate(
      { token: token },
      {
        password: hashpw,
      },
      { new: true }
    );

    console.log(updatedPassword);

    res.status(200).json({
      success: true,
      message: "password reset successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
