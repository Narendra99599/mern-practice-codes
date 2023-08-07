const BASE_URL = "http://localhost:4000/api/v1";

export const AuthEndpoints = {
    SEND_OTP_API : BASE_URL + "/otpGenerator",
    SIGNUP_API : BASE_URL + "/signup",
    LOGIN_API : BASE_URL + "/login",
    PASSWORD_RESET_TOKEN : BASE_URL + "/resetPasswordToken",
    PASSWORD_RESET_API : BASE_URL + "/resetPassword"
}