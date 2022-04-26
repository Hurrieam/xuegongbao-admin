export enum StatusCode {
    OK = 10000,
    ILLEGAL_PARAM,
    PASSWORD_ERROR,
    ACCOUNT_DISABLED,
    UNKNOWN_ERROR
}

export enum StatusMessage {
    OK = "成功",
    ILLEGAL_PARAM = "非法参数",
    PASSWORD_ERROR = "用户名或密码错误",
    ACCOUNT_DISABLED = "账号已被禁用",
    UNKNOWN_ERROR = "失败"
}
