import axios from "axios";
import qs from "qs";
import Message from "@arco-design/web-react/es/Message";
import {StorageKey} from "@/constant/keys";
import storage from "@/utils/storage";

const myAxios = axios.create({
    baseURL: process.env.REACT_APP_AXIOS_BASE_URL,
    timeout: 5000
});

myAxios.interceptors.request.use(
    config => {
        const {pathname} = window.location;
        const token = storage.getItem(StorageKey.USER_TOKEN);
        if (pathname !== "/login" && !token) {
            window.location.href = "/login";
            return;
        }
        config.headers["Authorization"] = token;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

myAxios.interceptors.response.use(
    response => {
        return response.data;
    },
    error => {
        // 如果是401，跳转到登录页
        if (error.response.status === 401) {
            Message.error("登录已过期，请重新登录");
            setTimeout(() => {
                window.location.href = "/login";
            }, 3000);
        }
        return Promise.reject(error);
    }
);

export const reqForGet = async (path: string, data: any): Promise<API.Response> => {
    return await myAxios.get(path, {params: data})
}

export const reqForPost = async (path: string, data: any): Promise<API.Response> => {
    return await myAxios.post(path, qs.stringify(data))
}