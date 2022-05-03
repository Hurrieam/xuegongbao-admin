import md5 from "md5";
import CryptoJS from "crypto-js";

const MD5_SALT_VALUE = process.env.REACT_APP_MD5_SALT_VALUE;
const SECURITY_KEY = process.env.REACT_APP_SECURITY_KEY;

export const encrypt = (str: string) => {
    return md5(md5(str) + MD5_SALT_VALUE);
};

/**
 * AES加密
 * @param str
 * @returns 加密后的字符串
 */
export const aesEncrypt = (str: string): string => {
    const key = CryptoJS.enc.Utf8.parse(SECURITY_KEY);
    const srcs = CryptoJS.enc.Utf8.parse(str);
    const encrypted = CryptoJS.AES.encrypt(srcs, key, {mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7});
    return encrypted.toString();
}

/**
 * AES解密
 * @param str
 * @returns  解密后的字符串
 */
export const aesDecrypt = (str: string): string => {
    const key = CryptoJS.enc.Utf8.parse(SECURITY_KEY);
    const decrypt = CryptoJS.AES.decrypt(str, key, {mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7});
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}