import {reqForPost} from "@/api/_config";
import {encrypt} from "@/utils/encryptor";

/**
 * 管理员登录
 * @param usernameAndPassword
 */
export const login = async (usernameAndPassword: API.LoginForm): Promise<API.Response> => {
    return await reqForPost(`/login`, {
        username: usernameAndPassword.username,
        password: encrypt(usernameAndPassword.password)
    });
}