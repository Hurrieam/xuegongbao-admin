import {reqForGet, reqForPost} from "@/api/_config";

/**
 * 分页获取评价列表
 */
export const findEvalList = async (page: number, pageSize: number) => {
    return await reqForGet("/canteen-eval/list", {page, pageSize});
}

/**
 * 根据id获取评价详情
 */
export const findEvalDetail = async (id: number) => {
    return await reqForGet("/canteen-eval/detail", {id});
}

/**
 * 根据id删除评价
 */
export const deleteEval = async (id: number) => {
    return await reqForPost("/canteen-eval/delete", {id});
}

/**
 * 获取评价总结数据
 */
export const findEvalSummary = async () => {
    return await reqForGet("/canteen-eval/summary", {});
}