import {get, post} from "@/api/_config";

/**
 * 添加联系人
 * @param data
 */
export const addPhoneNumber = (data: API.PhoneBook): Promise<API.Response> => {
    return post('/phonebook/add', data);
};

/**
 * 分页获取联系人
 * @param start
 * @param limit
 */
export const getPhoneBookList = (start: number, limit: number): Promise<API.Response> => {
    return get('/phonebook/list', {start, limit});
};

/**
 * 删除联系人
 * @param id
 */
export const deletePhoneNumberById = (id: number): Promise<API.Response> => {
    return post('/phonebook/delete', {id});
};