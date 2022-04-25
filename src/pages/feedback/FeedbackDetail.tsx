import React, {useEffect} from 'react';
import {Modal} from '@arco-design/web-react';
import {IDetailModalProps} from "@/types";


function FeedbackDetail({visible, id, callback, hidden}: IDetailModalProps) {
    useEffect(() => {
        fetchData();
    }, [id]);

    // TODO: 根据id获取评论详情
    const fetchData = async () => {
        console.log("fetch data");
    };

    const doOk = () => {
        callback(id);
    }

    const doCancel = () => {
        hidden();
    }
    return (
        <Modal
            title='详细信息'
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

export default FeedbackDetail;