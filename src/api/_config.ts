import axios from "axios";
import qs from "qs";
import Message from "@arco-design/web-react/es/Message";
import {keys} from "@/constant/keys";
import {StatusCode} from "@/constant/status";
import {ADMIN_OPENID} from "@/constant/others";

const myAxios = axios.create({
    baseURL: process.env.REACT_APP_AXIOS_BASE_URL,
    timeout: 5000
});

myAxios.interceptors.request.use(
    (config) => {
        const {pathname} = window.location;

        const token = localStorage.getItem(keys.USER_TOKEN);
        if (pathname != "/login" && !token) {
            window.location.href = "/login";
            return;
        }
        config.headers["Authorization"] = token;
        config.headers["Openid"] = ADMIN_OPENID;
        return config;
    },
    () => {
        Message.error("网络错误!");
    }
);

myAxios.interceptors.response.use(
    (response) => {
        const {data,config} = response;
        // 如果是/login请求且登陆成功,则把token存入localStorage
        if (config.url === "/login" && data.code === StatusCode.OK) {
            localStorage.setItem(keys.USER_TOKEN, response.data.data.token);
        }
        // 没有权限则重定向到login页面
        if (data.code === 10009) {
            Message.error("您的身份已过期,请重新登录!");
            setTimeout(() => {
                window.location.href = "/login";
            }, 3000);
        }
        return data;
    },
    (error) => {
        if (!error || !error.response) {
            Message.error("网络错误!");
            return;
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