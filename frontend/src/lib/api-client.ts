import axios, { InternalAxiosRequestConfig } from "axios";

// Extend InternalAxiosRequestConfig to include requiresAuth
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
    requiresAuth?: boolean;
}


export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL
});


console.log("API URL:", import.meta.env.VITE_BACKEND_URL);

const authRequestInterceptor = (config: CustomAxiosRequestConfig) => {
    if (config.headers) {
        config.headers.Accept = "application/json";
    }

    // Conditionally add Authorization header if the request requires authentication
    if (config.requiresAuth) {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }

    // Conditionally set withCredentials only for authenticated requests
    config.withCredentials = !!config.requiresAuth;

    return config;

}

apiClient.interceptors.request.use(authRequestInterceptor);

