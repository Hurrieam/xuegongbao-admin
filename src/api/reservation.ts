import {get, post} from "@/api/_config";

/**
 * 根据id获取预约信息
 */
export const getReservationById = (id: number): Promise<API.Response> => {
    return get("/reservation/get", {id});
}
/**
 * 分页获取报修订单列表
 */
export const getReservationList = (start: number, limit: number): Promise<API.Response> => {
    return get("/reservation/list", {start, limit});
}

/**
 * 根据id删除报修订单
 */
export const deleteReservationById = (id: number): Promise<API.Response> => {
    return post("/reservation/delete", {id});
}

/**
 * 根据id更新报修订单状态
 */
export const updateReservationStatusById = (id: number): Promise<API.Response> => {
    return post("/reservation/status", {id});
}