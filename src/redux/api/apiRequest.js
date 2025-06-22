
import { loginStart, loginSuccess, rigisterStart, rigisterSuccess ,logout } from "../slice/authSlice";
import { createUser, getCate, getProduct, getUser, loginUser } from '../../../Utils/api';
import { listUserLogin, listUserSuccess } from "../slice/userSlice";
import { productFailure, productStart, productSuccess } from "../slice/productSlice";
import { categoryStart, categorySuccess } from "../slice/categorySlice";

export const loginUserRedux = async (user, dispatch, navigate) => {
    dispatch(loginStart())
    try {
        const res = await loginUser(user.email, user.password)
        dispatch(loginSuccess(res))
        navigate("/")
        return res;
    } catch (error) {
        console.log(error);
    }
}
export const logoutRedux = async (dispatch, navigate) => {
    dispatch(logout())
    navigate("/login")
}
export const rigisterUserRedux = async (user, dispatch, navigate) => {
    dispatch(rigisterStart())
    try {
        const res = await createUser(user.name, user.email, user.password)
        // console.log("cheack", res);
        dispatch(rigisterSuccess(res.data))
        navigate("/")
        return res.data;
    } catch (error) {
        console.log(error);

    }
}
export const addUserRedux = async (user, dispatch) => {
    dispatch(rigisterStart())
    try {
        const res = await createUser(user.name, user.email, user.password)
        dispatch(rigisterSuccess(res.data))
        return res.data;
    } catch (error) {
        console.log(error);

    }
}
export const fethUserRedux = async (dispatch) => {
    dispatch(listUserLogin())
    try {
        const res = await getUser()
        dispatch(listUserSuccess(res))
        return res;
    } catch (error) {
        console.log(error);
    }
}

export const fethProductRedux = async (dispatch) => {
    dispatch(productStart())
    try {
        const res = await getProduct()
        dispatch(productSuccess(res))
        return res;
    } catch (error) {
        dispatch(productFailure(error));
    }
}

export const fethCategoryRedux = async (dispatch) => {
    dispatch(categoryStart())
    try {
        const res = await getCate()
        dispatch(categorySuccess(res))
        return res;
    } catch (error) {
        console.log(error);
    }
}