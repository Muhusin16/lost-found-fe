import axios from 'axios';
import { getJsonValueFromLocalStorage } from './coreServices';

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
        'Content-type': 'application/json',
    }
})

axiosInstance.interceptors.request.use(
    (config) => {
     const fToken = getJsonValueFromLocalStorage('token');
     if (fToken) {
        config.headers['Authorization'] = fToken;
     }

      config.headers.Authorization = fToken;
      return config;
    },
    (error) => {
        Promise.reject(error);
    }
)

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {

        const originalRequest = error.config;

        if (error.response && (error.response.status === 400 || error.response.status === 401 && originalRequest._retry)) {
           originalRequest._retry = true;
           try {
            originalRequest.headers.Authorization = getJsonValueFromLocalStorage('token')
           } catch (refreshError) {
            return Promise.reject(refreshError);
           }
        }
        return Promise.reject(error);
    }
)

export default axiosInstance;