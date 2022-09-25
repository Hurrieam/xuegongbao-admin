import {reqForGet, reqForPost} from "@/api/_config";

/**
 * 添加一条回复留言
 * @param data
 */
export const createMessage = async (data): Promise<API.Response> => {
    return await reqForPost("/message/create", data);
};

/**
 * 获取留言列表
 * @param start
 * @param limit
 */
export const findMessageList = async (page: number, pageSize: number): Promise<API.Response> => {
    return await reqForGet("/message/list", {page, pageSize});
}

/**
 * 改变留言状态
 * @param id
 */
export const updateMessageStatus = async (id: number): Promise<API.Response> => {
    return await reqForPost("/message/status", {id: id});
}

/**
 * 删除留言
 * @param id
 */
export const deleteMessage = async (id: number): Promise<API.Response> => {
    return await reqForPost("/message/delete", {id: id});
}

/**
 * 根据留言id获取详细信息，包含回复留言
 * @param id
 */
export const findMessageDetail = async (id: number): Promise<API.Response> => {
    return await reqForGet("/message/detail", {id: id});
}