import md5 from "md5";
import CryptoJS from "crypto-js";

const MD5_SALT_VALUE = process.env.REACT_APP_MD5_SALT_VALUE;
const SECURITY_KEY = process.env.REACT_APP_SECURITY_KEY;

export const encrypt = (str: string) => {
    return md5(md5(str2Binary(str)) + str2Binary(MD5_SALT_VALUE));
};

/**
 * AES加密
 * @param str
 * @returns 加密后的字符串
 */
export const aesEncrypt = (str: string): string => {
    const key = CryptoJS.enc.Utf8.parse(SECURITY_KEY);
    const iv = CryptoJS.enc.Utf8.parse(SECURITY_KEY);
    const encrypted = CryptoJS.AES.encrypt(str, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    });
    return encrypted.toString();
};

/**
 * AES解密
 * @param str
 * @returns  解密后的字符串
 */
export const aesDecrypt = (str: string): string => {
    const key = CryptoJS.enc.Utf8.parse(SECURITY_KEY);
    const iv = CryptoJS.enc.Utf8.parse(SECURITY_KEY);
    const decrypted = CryptoJS.AES.decrypt(str, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
};

/**
 * 将字符串转换为二进制字符串
 * @param str
 */
const str2Binary = (str: string) => {
    const bytes = [];
    const len = str.length;
    for (let i = 0; i < len; i++) {
        bytes[i] = str.charCodeAt(i);
    }
    return bytes.join("");
};