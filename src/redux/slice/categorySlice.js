import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
    name:'categories',
    initialState: {
        category:{
            currentCategory : null,
            isFetching: false,
            error: false
        }
    },
    reducers: {
        categoryStart: (state) =>{
            state.isFetching=true
        },
        categorySuccess: (state, action) =>{
            state.category.isFetching = false,
            state.category.currentCategory = action.payload,
            state.category.error = false
        },
        categoryFalse: (state) => {
            state.category.isFetching = false,
            state.category.currentCategory = null,
            state.category.error = true
        }
    }
})

export const {categoryFalse , categoryStart, categorySuccess} = categorySlice.actions
export default categorySlice.reducer