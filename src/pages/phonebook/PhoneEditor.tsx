import React from 'react';
import {Modal} from '@arco-design/web-react';
import {IDetailModalProps} from "@/types";

const PhoneBookDetail: React.FC<IDetailModalProps> = ({visible, callback, hidden}: IDetailModalProps) => {
    const doOk = () => {
        callback(null);
    }

    const doCancel = () => {
        hidden();
    }
    return (
        <Modal
            title='添加号码'
            visible={visible}
            onOk={doOk}
            onCancel={doCancel}
            autoFocus={false}
            focusLock={true}
        >
            <p>
                You can customize modal body text by the current situation. This modal will be closed
                immediately once you press the OK button.
            </p>
        </Modal>
    )
}

export default PhoneBookDetail;