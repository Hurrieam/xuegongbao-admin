export interface IDetailModalProps {
    visible: boolean;
    data?: any;
    callback: (e) => void;
    hidden: () => void;
}
export interface IResponse{
    code: number;
    data?: any;
    message?: string;
    description?: string;
}
