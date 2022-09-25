import {reqForGet} from "@/api/_config";

/**
 * 获取当日系统使用量
 */
export const findDayUsage = (): Promise<API.Response> => {
    return reqForGet("/day-usage", {});
}

/**
 * 获取近30天系统使用量
 */
export const findMonthUsage = (): Promise<API.Response> => {
    return reqForGet("/month-usage", {});
}