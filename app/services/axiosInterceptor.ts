import axios from 'axios';
import { getJsonValueFromLocalStorage } from './coreServices';

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
        'Content-type': 'application/json',
    }
});

// Request interceptor to add token
axiosInstance.interceptors.request.use(
    (config) => {
        const token = getJsonValueFromLocalStorage('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`; // Ensure proper Bearer format
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor for handling errors and retry logic
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const originalRequest = error.config;

        // Retry the request if 401 Unauthorized and no retry attempt yet
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            
            // Optionally, implement token refresh logic here
            const token = getJsonValueFromLocalStorage('token');
            if (token) {
                originalRequest.headers['Authorization'] = `Bearer ${token}`;
                return axiosInstance(originalRequest); // Retry the original request with updated token
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
