import {get, post} from "@/api/_config";

/**
 * 根据id获取招领信息
 * @param id
 */
export const getLAFbyId = (id: string): Promise<API.Response> => {
    return get("/laf/get",{id});
};

/**
 * 分页获取失物招领列表
 * @param start
 * @param limit
 */
export const getLAFList = (start: number, limit: number): Promise<API.Response> => {
    return get("/laf/list", {start: start, limit});
}

/**
 * 删除一条失物招领信息
 * @param id
 */
export const deleteLAFById = (id: number): Promise<API.Response> => {
    return post("/laf/delete", {id});
}
