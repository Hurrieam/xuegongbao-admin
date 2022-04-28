import axios from "axios";
import {IResponse} from "@/types";
import qs from "qs";

const myAxios = axios.create({
    baseURL: process.env.REACT_APP_AXIOS_BASE_URL,
    timeout: 5000
});

myAxios.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const get = async (path: string, data: any): Promise<IResponse> => {
    return await myAxios.get(path, {params: data})
}

export const post = async (path: string, data: any): Promise<IResponse> => {
    return await myAxios.post(path, qs.stringify(data))
}