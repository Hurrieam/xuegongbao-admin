import {post} from "@/api/_config";
import {IResponse} from "@/types";
import {ILoginForm} from "@/pages/login/form";
import {encrypt} from "@/utils/encryptor";

/**
 * 管理员登录
 * @param usernameAndPassword
 */
export const login = async (usernameAndPassword: ILoginForm): Promise<IResponse> => {
    return await post(`/login`, {
        username: usernameAndPassword.username,
        password: encrypt(usernameAndPassword.password)
    });
}