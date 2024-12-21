import axios from "axios";
import { appConfig } from "../configs/AppConfigs";
import { LOCAL_STORAGE_KEYS } from "../constants/localStroage";

export const authenticatedClient = axios.create({
    baseURL: appConfig.apiBaseUrl
});

export const unauthenticatedClient = axios.create({
    baseURL: appConfig.apiBaseUrl
});

// Add request interceptor to attach the auth token
authenticatedClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);



