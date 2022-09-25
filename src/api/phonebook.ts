import {reqForGet, reqForPost} from "@/api/_config";

/**
 * 添加联系人
 * @param data
 */
export const createPhoneNumber = (data: API.PhoneBook): Promise<API.Response> => {
    return reqForPost('/phonebook/create', data);
};

/**
 * 分页获取联系人
 * @param start
 * @param limit
 */
export const findPhoneBookList = (page: number, pageSize: number): Promise<API.Response> => {
    return reqForGet('/phonebook/list', {page, pageSize});
};

/**
 * 删除联系人
 * @param id
 */
export const deletePhoneNumber = (id: number): Promise<API.Response> => {
    return reqForPost('/phonebook/delete', {id});
};