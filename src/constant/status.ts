export enum StatusCode {
    OK = 10000,
    ILLEGAL_PARAM,
    PASSWORD_ERROR,
    ACCOUNT_DISABLED,
    UPLOAD_FILE_NOT_FOUND,
    UPLOAD_FILE_TYPE_ERROR,
    UNKNOWN_ERROR
}

export enum StatusMessage {
    OK = "成功!",
    ILLEGAL_PARAM = "非法参数!",
    PASSWORD_ERROR = "用户名或密码错误!",
    ACCOUNT_DISABLED = "账号已被禁用!",
    UPLOAD_FILE_NOT_FOUND = "上传文件不存在!",
    UPLOAD_FILE_TYPE_ERROR = "上传文件类型错误!",
    UPDATE_STATUS_OK = "状态更新成功!",
    UPDATE_STATUS_ERROR = "状态更新失败!",
    FETCH_DATA_ERROR = "获取数据失败!",
    DELETE_OK = "删除成功!",
    DELETE_FAILED = "删除失败!",
    NETWORK_ERROR = "网络错误!",
    UNKNOWN_ERROR = "未知错误!"
}
