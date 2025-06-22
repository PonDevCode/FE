import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        login: {
            currentUser: null,
            isFetching: false,
            error: false
        },
        rigister: {
            currentUser: null,
            isFetching: false,
            error: false
        }

    },

    reducers: {
        loginStart: (state) => {
            state.login.isFetching = true
        },
        loginSuccess: (state, action) => {
            state.login.isFetching = false,
                state.login.currentUser = action.payload,
                state.login.error = false
        },
        logout: (state) => {
            state.login.isFetching = null,
                state.login.currentUser = null,
                state.login.error = false
        }
        ,
        loginFalse: (state) => {
            state.login.isFetching = false,
                state.login.error = true
        },
        rigisterStart: (state) => {
            state.rigister.isFetching = true
        },
        rigisterSuccess: (state, action) => {
            state.rigister.isFetching = false,
                state.rigister.currentUser = action.payload,
                state.rigister.error = false
        },
        rigisterFalse: (state) => {
            state.rigister.isFetching = false,
                state.rigister.error = true
        }
    }


})


export const { loginStart, loginSuccess, loginFalse, rigisterSuccess, rigisterFalse, rigisterStart ,logout } = authSlice.actions;
export default authSlice.reducer;