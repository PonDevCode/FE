import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name:'products',
    initialState: {
        product: {
            currentProduct: null,
            isFetching: false,
            error:false
        }
    },
    reducers:{
        productStart:(state) =>{
            state.product.isFetching=true
        },
        productSuccess:(state, action) =>{
            state.product.isFetching=false,
            state.product.currentProduct=action.payload,
            state.product.error=false
        },
        productFailure :(state) =>{
            state.product.isFetching=false,
            state.product.error=true
        }
    }
})


export const {productStart , productFailure  , productSuccess} = productSlice.actions
export default productSlice.reducer