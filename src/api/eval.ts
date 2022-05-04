import {get, post} from "@/api/_config";

/**
 * 分页获取评价列表
 */
export const getEvalList = async (start: number, limit: number) => {
    return await get("/api/eval/list", {start, limit});
}

/**
 * 根据id获取评价详情
 */
export const getEvalDetailById = async (id: number) => {
    return await get("/api/eval/get", {id});
}

/**
 * 根据id删除评价
 */
export const deleteEvalById = async (id: number) => {
    return await post("/api/eval/delete", {id});
}

/**
 * 获取评价总结数据
 */
export const getEvalSummary = async () => {
    return await get("/api/eval/summary", {});
}