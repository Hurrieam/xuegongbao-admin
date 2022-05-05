// 格式化时间
export const formatDate = (date: string) => {
    let res: string;
    try {
        const d = new Date(date);
        res = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${d.getHours() < 10 ? "0" + d.getHours() : d.getHours()}:${d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes()}`;
    } catch (e) {
        res = date;
    }
    return res;
};