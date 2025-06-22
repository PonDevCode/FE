
import { createSlice } from "@reduxjs/toolkit";

const authUser = createSlice({
    name: "user",
    initialState:{
        listUser:{
            users: null,
            isFetching: false,
            error: false
        }
    },
    reducers:{
        listUserLogin : (state) => {
            state.listUser.users = null;
            state.listUser.isFetching = true;
            state.listUser.error = false;
        },
        listUserSuccess : (state, action) => {
            state.listUser.users = action.payload;
            state.listUser.isFetching = false;
            state.listUser.error = false;
        },
        listUserFalse : (state) => {
            state.listUser.users = null;
            state.listUser.isFetching = false;
            state.listUser.error = true;
        }
    }
})

export const {listUser, listUserFalse, listUserLogin, listUserSuccess,logout} = authUser.actions
export default authUser.reducer