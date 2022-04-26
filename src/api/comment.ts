import {get, post} from "@/api/_config";
import {IResponse} from "@/types";

/**
 * 添加一条回复评论
 * @param data
 */
export const addComment = async (data) => {
    return await post("/comment/add", data);
};

/**
 * 获取评论列表
 * @param start
 * @param limit
 */
export const getComments = async (start: number, limit: number): Promise<IResponse> => {
    return await get("/comment/list", {start, limit});
}

/**
 * 改变评论状态
 * @param id
 */
export const changeStatus = async (id: number) => {
    return await post("/comment/status", {id: id});
}
/**
 * 删除评论
 * @param id
 */
export const deleteComment = async (id: number) => {
    return await post("/comment/delete", {id: id});
}
