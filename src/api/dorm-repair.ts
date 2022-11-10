import {reqForGet, reqForPost} from "@/api/_config";

/**
 * 根据id获取报修订单
 */
export const findRepairDetail = (id: number): Promise<API.Response> => {
    return reqForGet("/dorm-repair/detail", {id});
}

/**
 * 分页获取报修订单列表
 */
export const findRepairList = (page: number, pageSize: number): Promise<API.Response> => {
    return reqForGet("/dorm-repair/list", {page, pageSize});
}

/**
 * 根据id删除报修订单
 */
export const deleteRepairItem = (id: number): Promise<API.Response> => {
    return reqForPost("/dorm-repair/delete", {id});
}

/**
 * 根据id更新报修订单状态
 */
export const updateRepairItemStatus = (id: number): Promise<API.Response> => {
    return reqForPost("/dorm-repair/status", {id});
}