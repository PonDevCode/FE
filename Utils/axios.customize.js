import axios from "axios";
import {store} from "../src/redux/store/store";


const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL
});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  const state = store.getState();
  const token = state.auth.login?.currentUser?.access_token;
  if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

     

  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  if (response && response.data) return response.data
  // return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});

// Thay đổi cấu hình mặc định sau khi tạo instance
export default instance
