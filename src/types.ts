export interface IDetailModalProps {
    visible: boolean;
    id?: number;
    callback: (e) => void;
    hidden: () => void;
}