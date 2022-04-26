import md5 from "md5";
import CryptoJS from "crypto-js";
import {keys} from "@/constant/keys";

const salt = "onezol.com";
export const encrypt = (str: string) => {
    return md5(md5(str + salt));
};

/**
 * 加密
 * @returns 加密后的字符串
 * @param str
 */
export const aesEncrypt = (str: string): string => {
    const key = CryptoJS.enc.Utf8.parse(keys.SECURITY_KEY);
    const srcs = CryptoJS.enc.Utf8.parse(str);
    const encrypted = CryptoJS.AES.encrypt(srcs, key, {mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7});
    return encrypted.toString();
}

/**
 * 解密
 * @returns  解密后的字符串
 * @param str
 */
export const aesDecrypt = (str: string): string => {
    const key = CryptoJS.enc.Utf8.parse(keys.SECURITY_KEY);
    const decrypt = CryptoJS.AES.decrypt(str, key, {mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7});
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}