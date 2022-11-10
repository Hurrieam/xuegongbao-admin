import axios from "axios";
import qs from "qs";
import Message from "@arco-design/web-react/es/Message";
import {StorageKey} from "@/constant/keys";
import {StatusCode} from "@/constant/status";
import {ADMIN_STU_ID} from "@/constant/others";
import storage from "@/utils/storage";

const myAxios = axios.create({
    baseURL: process.env.REACT_APP_AXIOS_BASE_URL,
    timeout: 5000
});

myAxios.interceptors.request.use(
    (config) => {
        const {pathname} = window.location;

        const token = storage.getItem(StorageKey.USER_TOKEN);
        const account = storage.getItem(StorageKey.USER_ACCOUNT);
        if (pathname !== "/login" && !token) {
            window.location.href = "/login";
            return;
        }
        if (pathname !== "/login") {
            config.headers["Authorization"] = token;
            config.headers["StuId"] = account;
            // config.headers["Fingerprint"] = ADMIN_FINGERPRINT;
        }
        return config;
    },
    () => {
        Message.error("网络错误!");
    }
);

myAxios.interceptors.response.use(
    (response) => {
        const {data, config} = response;
        // 如果是/login请求且登陆成功,则把token存入localStorage
        // if (config.url === "/login" && data.code === StatusCode.OK) {
        //     storage.setItem(StorageKey.USER_TOKEN, data.token);
        // }
        // 没有权限则重定向到login页面
        if (data.code === 10009) {
            Message.error("您的身份已过期,请重新登录!");
            setTimeout(() => {
                // window.location.href = "/login";
            }, 3000);
        }
        return data;
    },
    (error) => {
        if (!error || !error.response) {
            Message.error("网络错误!");
        } else if (error && error.response && error.response.status == "401") {
            Message.error("您的身份已过期,请重新登录!");
            setTimeout(() => {
                window.location.href = "/login";
            }, 3000);
        }
    }
);

export const get = async (path: string, data: any): Promise<API.Response> => {
    return await myAxios.get(path, {params: data})
}

export const post = async (path: string, data: any): Promise<API.Response> => {
    return await myAxios.post(path, qs.stringify(data))
}

export const reqForGet = async (path: string, data: any): Promise<API.Response> => {
    return await myAxios.get(path, {params: data})
}

export const reqForPost = async (path: string, data: any): Promise<API.Response> => {
    return await myAxios.post(path, qs.stringify(data))
}