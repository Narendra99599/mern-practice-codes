import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./slices/authSlice";
import profileSliceReducer from "./slices/profileSlice";

const store = configureStore({
    reducer : combineReducers({
        auth : authSliceReducer,
        profile : profileSliceReducer,
    })
})
export default store;