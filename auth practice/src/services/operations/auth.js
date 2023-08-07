import { toast } from "react-toastify";
import { setLoading, setToken } from "../../redux/slices/authSlice";
import apiConnector from "../apiconnector";
import { AuthEndpoints } from "../apis";
import { setUser } from "../../redux/slices/profileSlice";


export function sendOtp(email,navigate){
    return async(dispatch) => {
        dispatch(setLoading(true));
        console.log("your email is ",email);
        try{
            let response = await apiConnector(AuthEndpoints.SEND_OTP_API,"POST",{email});
            console.log("the response is ",response);
            if(!response.data.success){
                toast.error(response.data.message);
                throw new Error(response.data.message);
            }
            console.log("otp sent succesffulyy");
            toast.success(response.data.message);
            navigate('/verify-email')
        }catch(error){
            console.log("SENDOTP API ERROR............", error)
        }
        dispatch(setLoading(false));
    }
}

export function signup(data,navigate){
    return async(dispatch)=>{
        setLoading(true);
        try{
            let response = await apiConnector(AuthEndpoints.SIGNUP_API,"POST",data);
            console.log(response);
            if(response.data.success === false){
                toast.error(response.data.message);
                throw new Error(response.data.message);
            }
            console.log("registered successfully");
            toast.success("register successfully");
            navigate("/login");
        }catch(error){
            console.log("Signup api error is ",error);
        }
        setLoading(false);
    }
}

export function login(data,navigate){
    return async(dispatch)=>{
        setLoading(true);
        try{
            let response = await apiConnector(AuthEndpoints.LOGIN_API,"POST",data);
            if(response.data.success === false){
                toast.error(response.data.message);
                throw new Error(response.data.message);
            }
            let token = response.data.token;
            let details = response.data.user;
            dispatch(setToken(token));
            localStorage.setItem('token',JSON.stringify(token));
            dispatch(setUser(details));
            toast.success(response.data.message);
            navigate("/")
        }catch(error){
            console.log("Signup api error is ",error);
        }
        setLoading(false);
    }
}