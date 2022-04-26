import {IPhoneBook} from "@/pages/phonebook";
import {get, post} from "@/api/_config";
import {IResponse} from "@/types";

/**
 * 添加联系人
 * @param data
 */
export const addPhoneNumber = (data: IPhoneBook): Promise<IResponse> => {
    return post('/phonebook/add', data);
};

/**
 * 分页获取联系人
 * @param start
 * @param limit
 */
export const getPhoneBook = (start: number, limit: number): Promise<IResponse> => {
    return get('/phonebook/list', {start, limit});
};

/**
 * 删除联系人
 * @param id
 */
export const deletePhoneNumber = (id: number): Promise<IResponse> => {
    return post('/phonebook/delete', {id});
};