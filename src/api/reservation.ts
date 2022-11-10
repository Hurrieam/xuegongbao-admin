import {reqForGet, reqForPost} from "@/api/_config";

/**
 * 根据id获取预约信息
 */
export const findReservationDetail = (id: number): Promise<API.Response> => {
    return reqForGet("/reservation/detail", {id});
}
/**
 * 分页获取报修订单列表
 */
export const findReservationList = (page: number, pageSize: number): Promise<API.Response> => {
    return reqForGet("/reservation/list", {page, pageSize});
}

/**
 * 根据id删除报修订单
 */
export const deleteReservation = (id: number): Promise<API.Response> => {
    return reqForPost("/reservation/delete", {id});
}

/**
 * 根据id更新报修订单状态
 */
export const updateReservationStatus = (id: number): Promise<API.Response> => {
    return reqForPost("/reservation/status", {id});
}