import axios from "axios";
import qs from "qs";
import Message from "@arco-design/web-react/es/Message";
import {keys} from "@/constant/keys";

const myAxios = axios.create({
    baseURL: process.env.REACT_APP_AXIOS_BASE_URL,
    timeout: 5000
});

myAxios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(keys.USER_TOKEN);
        if (!token) {
            window.location.href = "/login";
            return;
        }
        config.headers["Authorization"] = token;
        return config;
    },
    () => {
        Message.error("网络错误!");
        setTimeout(() => {
            window.location.href = "/login";
        }, 2000);
        return;
    }
);

myAxios.interceptors.response.use(
    (response) => {
        // 如果是/login请求,则把token存入localStorage
        if (response.config.url === "/login") {
            localStorage.setItem(keys.USER_TOKEN, response.data.data.token);
        }
        return response.data;
    },
    (error) => {
        if (!error.response) {
            Message.error("网络错误!");
        } else if (error.response.status === 401) {
            Message.error("您的身份已过期,请重新登录!");
            setTimeout(() => {
                window.location.href = "/login";
            }, 2000);
        }
    }
);

export const get = async (path: string, data: any): Promise<API.Response> => {
    return await myAxios.get(path, {params: data})
}

export const post = async (path: string, data: any): Promise<API.Response> => {
    return await myAxios.post(path, qs.stringify(data))
}