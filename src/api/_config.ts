import axios from "axios";
import {IResponse} from "@/types";
import qs from "qs";
import Message from "@arco-design/web-react/es/Message";

const myAxios = axios.create({
    baseURL: process.env.REACT_APP_AXIOS_BASE_URL,
    timeout: 5000
});

myAxios.interceptors.response.use(
    response => {
        return response.data;
    },
    () => {
        Message.error("网络错误");
        return;
    }
);

export const get = async (path: string, data: any): Promise<IResponse> => {
    return await myAxios.get(path, {params: data})
}

export const post = async (path: string, data: any): Promise<IResponse> => {
    return await myAxios.post(path, qs.stringify(data))
}