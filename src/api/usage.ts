import {get} from "@/api/_config";

/**
 * 获取当日系统使用量
 */
export const getDayUsage = (): Promise<API.Response> => {
    return get("/day-usage", {});
}

/**
 * 获取近30天系统使用量
 */
export const getMonthUsage = (): Promise<API.Response> => {
    return get("/month-usage", {});
}