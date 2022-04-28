import {get, post} from "@/api/_config";
import {IResponse} from "@/types";

/**
 * 分页获取失物招领列表
 * @param start
 * @param limit
 */
export const getLAFs = (start: number, limit: number): Promise<IResponse> => {
    return get("/laf/list", {start, limit});
}

/**
 * 删除一条失物招领信息
 * @param id
 */
export const deleteLAF = (id: number): Promise<IResponse> => {
    return post("/laf/delete", {id});
}