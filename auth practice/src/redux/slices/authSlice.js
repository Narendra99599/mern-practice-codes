import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    token : localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null,
    signUpdata : null,
    loading : false,
}

const authSlice = createSlice({
    name : "auth",
    initialState : initialState,
    reducers : {
        setToken(state, action){
            state.token = action.payload;
        },
        setSignupData(state,action){
            state.signUpdata = action.payload;
        },
        setLoading(state, action){
            state.loading = action.payload
        }
    }
})

export const {setToken,setLoading,setSignupData} = authSlice.actions;

export default authSlice.reducer;