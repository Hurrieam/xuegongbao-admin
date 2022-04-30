import {get, post} from "@/api/_config";
import {IResponse} from "@/types";

/**
 * 添加一条回复留言
 * @param data
 */
export const addComment = async (data): Promise<IResponse> => {
    return await post("/comment/add", data);
};

/**
 * 获取留言列表
 * @param start
 * @param limit
 */
export const getComments = async (start: number, limit: number): Promise<IResponse> => {
    return await get("/comment/list", {start, limit});
}

/**
 * 改变留言状态
 * @param id
 */
export const changeStatus = async (id: number): Promise<IResponse> => {
    return await post("/comment/status", {id: id});
}

/**
 * 删除留言
 * @param id
 */
export const deleteComment = async (id: number): Promise<IResponse> => {
    return await post("/comment/delete", {id: id});
}

/**
 * 根据留言id获取详细信息，包含回复留言
 * @param id
 */
export const getCommentDetails = async (id: number): Promise<IResponse> => {
    return await get("/comment/detail", {id: id});
}