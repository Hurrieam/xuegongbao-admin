import {IResponse} from "@/types";
import {get, post} from "@/api/_config";

/**
 * 根据id获取报修订单
 */
export const getRepairItemById = (id: string): Promise<IResponse> => {
    return get("/dorm-repair", {id});
}

/**
 * 分页获取报修订单列表
 */
export const getRepairList = (start: number, limit: number): Promise<IResponse> => {
    return get("/dorm-repair/list", {start, limit});
}

/**
 * 根据id删除报修订单
 */
export const deleteRepairItemById = (id: number): Promise<IResponse> => {
    return post("/dorm-repair/delete", {id});
}

/**
 * 根据id更新报修订单状态
 */
export const updateRepairItemStatusById = (id: number): Promise<IResponse> => {
    return post("/dorm-repair/status", {id});
}