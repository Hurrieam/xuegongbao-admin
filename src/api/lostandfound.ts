import {reqForGet, reqForPost} from "@/api/_config";

/**
 * 根据id获取招领信息
 * @param id
 */
export const findLafItem = (id: number): Promise<API.Response> => {
    return reqForGet("/laf/detail",{id});
};

/**
 * 分页获取失物招领列表
 * @param start
 * @param limit
 */
export const findLafList = (page: number, pageSize: number): Promise<API.Response> => {
    return reqForGet("/laf/list", {page, pageSize});
}

/**
 * 删除一条失物招领信息
 * @param id
 */
export const deleteLafItem = (id: number): Promise<API.Response> => {
    return reqForPost("/laf/delete", {id});
}
