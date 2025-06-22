import axios from './axios.customize';

const createUser = async (name, email, password) => {
    try {
        const URL_API = "/v1/resigter"
        const data = {
            name, email, password
        }
        const res = await axios.post(URL_API, data);
        return res
    } catch (error) {
        console.log(error);
    }
}

const loginUser = async (email, password) => {
    try {
        const URL_API = "/v1/login"
        const data = {
            email, password
        }
        const res = await axios.post(URL_API, data, {
            withCredentials: true
        });
        return res
    } catch (error) {
        console.log(error);
    }
}
const getUser = async () => {
    const URL_API = "/v1/user"
    const data = await axios.get(URL_API)
    return data
}
const deleteUser = async (id) =>{
    const URL_API = `/v1/user/delete/${id}`
    const data = await axios.delete(URL_API)
    return data
}

const editUser = async (id,formData) =>{
    const URL_API = `/v1/user/edit/${id}`
    const data = await axios.put(URL_API,formData)
    return data
}
const getCate = async () => {
    const URL_API = 'v1/category'
    const data = await axios.get(URL_API)
    return data
}
const addCate = async (FormData) => {
    const URL_API = 'v1/addCate'
    const data = await axios.post(URL_API, FormData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    return data
}
const getProduct = async () => {
    const URL_API = "/v1/product"
    const data = await axios.get(URL_API)
    return data
}
const addProduct = async (FormData) => {
    const URL_API = 'v1/addProduct'
    const data = await axios.post(URL_API, FormData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    return data
}

const deleteProduct = async (id) =>{
    const URL_API = `/v1/delete/${id}`
    const data = await axios.delete(URL_API)
    return data
}

const deleteCategory = async (id) =>{
    const URL_API = `/v1/deleteCate/${id}`
    const data = await axios.delete(URL_API)
    return data
}


const addVariantProduct = async (data) => {
    const URL_API = '/v1/productVariant'
    const result = await axios.post(URL_API,data)
    return result
}
const updateProduct = async (data,id) =>{
    const URL_API = `/v1/update/${id}`
    const result = await axios.put(URL_API,data)
    return result
}
const updateCate = async (data,id) =>{
    const URL_API = `/v1/updateCate/${id}`
    const result = await axios.put(URL_API,data)
    return result
}
export {
    createUser,
    loginUser,
    getUser,
    getCate,
    addProduct,
    getProduct,
    addCate,
    deleteProduct,
    deleteCategory,
    addVariantProduct,
    updateProduct,
    updateCate,
    deleteUser,
    editUser
}