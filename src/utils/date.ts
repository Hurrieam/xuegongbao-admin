// 格式化时间
export const formatDate = (date: string, pattern?: string) => {
    // 2023-04-02T10:45:43.000Z
    // 默认格式化为 yyyy-MM-dd HH:mm
    let defaultPattern = pattern || "yyyy-MM-dd HH:mm";
    const d = new Date(date);
    const o = {
        "M+": d.getMonth() + 1, // month
        "d+": d.getDate(), // day
        "H+": d.getHours(), // hour
        "m+": d.getMinutes(), // minute
        "s+": d.getSeconds(), // second
        "q+": Math.floor((d.getMonth() + 3) / 3), // quarter
        S: d.getMilliseconds(), // millisecond
    };
    if (/(y+)/.test(defaultPattern)) {
        defaultPattern = defaultPattern.replace(
            RegExp.$1,
            (d.getFullYear() + "").substr(4 - RegExp.$1.length)
        );

    }
    for (const k in o) {
        if (new RegExp("(" + k + ")").test(defaultPattern)) {
            defaultPattern = defaultPattern.replace(
                RegExp.$1,
                RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
            );
        }
    }
    return defaultPattern;
};