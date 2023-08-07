import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    loading : false,
    user : null,
}

const profileSlice = createSlice({
    name : "profile",
    initialState : initialState,
    reducers : {
        setLoading(state, action){
            state.loading = action.payload
        },
        setUser(state,action){
            state.user = action.payload
        }
    }
})

export const {setLoading,setUser} = profileSlice.actions;

export default profileSlice.reducer;