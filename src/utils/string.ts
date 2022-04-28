export const substrAndEllipsis = (str: string, length: number) => {
    return str?.length < length ? str : str?.substring(0, length) + "...";
};

export const isValidString = (str: any): boolean => {
    return typeof str === 'string' && str.replace(/\s+/g, '').length > 0;
};