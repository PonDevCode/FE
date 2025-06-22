import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../slice/authSlice'
import userReducer from '../slice/userSlice'
import productReducer from '../slice/productSlice'
import categoryReducer from '../slice/categorySlice'

export const store = configureStore({
    reducer:{
        auth:authReducer,
        user:userReducer, 
        products:productReducer,
        categories:categoryReducer
    }
})