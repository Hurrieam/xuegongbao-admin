import React, {useEffect, useState} from 'react';
import {Descriptions, Message, Modal, Tag} from '@arco-design/web-react';
import {updateReservationStatusById} from "@/api/reservation";

const ReservationDetail: React.FC<API.DetailModalProps> = ({visible, data, callback, hidden}: API.DetailModalProps) => {
    const [state, setState] = useState<boolean>(false);
    useEffect(() => {
        if (!data) return;
        setState(data.status);
    }, [data]);

    const doOk = async () => {
        try {
            const {code} = await updateReservationStatusById(data.id);
            if (code != 10000) {
                Message.error('修改失败!');
                return;
            }
            setState(true);
            data.status = true;
            callback && callback(data);
            Message.success('修改成功!');
        } catch (e) {
            Message.error('网络错误!');
        }
    };

    const doCancel = () => {
        hidden();
    }

    const getRows = (data: API.Reservation) => {
        if (!data) return [];
        return [{
            label: '咨询类型',
            value: data.type,
        }, {
            label: '学生姓名',
            value: data.stuName
        }, {
            label: '所属院系',
            value: data.sdept
        }, {
            label: '咨询内容',
            value: data.content
        }, {
            label: '预定时间',
            value: data.time
        }, {
            label: '联系方式',
            value: data.contact
        }, {
            label: '当前状态',
            value: state ? (<Tag color="#00b42a">已处理</Tag>) : (<Tag color="#f53f3f">未处理</Tag>)
        }];
    }
    return (
        <Modal
            title='详细信息'
            visible={visible}
            onOk={doOk}
            onCancel={doCancel}
            autoFocus={false}
            focusLock={true}
            maskClosable={false}
            okText='修改状态'
            okButtonProps={{
                disabled: state
            }}
        >
            <Descriptions
                column={1}
                title='基本信息'
                data={getRows(data)}
                style={{marginBottom: 20}}
                labelStyle={{paddingRight: 36}}
            />
        </Modal>
    )
}
export default ReservationDetail;