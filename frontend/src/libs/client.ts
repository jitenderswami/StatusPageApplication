import axios from "axios";
import { appConfig } from "../configs/AppConfigs";

export const authenticatedClient = axios.create({
    baseURL: appConfig.apiBaseUrl
});


// A function to set the auth token
export const setAuthToken = (token: string) => {
    authenticatedClient.interceptors.request.use(
        (config) => {
            config.headers.Authorization = `Bearer ${token}`;
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
};

export const unauthenticatedClient = axios.create({
    baseURL: appConfig.apiBaseUrl
});
