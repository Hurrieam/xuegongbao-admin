import {get, post} from "@/api/_config";

/**
 * 添加一条回复留言
 * @param data
 */
export const addComment = async (data): Promise<API.Response> => {
    return await post("/comment/add", data);
};

/**
 * 获取留言列表
 * @param start
 * @param limit
 */
export const getCommentList = async (start: number, limit: number): Promise<API.Response> => {
    return await get("/comment/list", {start, limit});
}

/**
 * 改变留言状态
 * @param id
 */
export const updateCommentStatusById = async (id: number): Promise<API.Response> => {
    return await post("/comment/status", {id: id});
}

/**
 * 删除留言
 * @param id
 */
export const deleteCommentById = async (id: number): Promise<API.Response> => {
    return await post("/comment/delete", {id: id});
}

/**
 * 根据留言id获取详细信息，包含回复留言
 * @param id
 */
export const getCommentDetailsById = async (id: number): Promise<API.Response> => {
    return await get("/comment/detail", {id: id});
}