import React, {useEffect, useState} from 'react';
import {Descriptions, Message, Modal, Spin, Tag} from '@arco-design/web-react';
import {formatDate} from "@/utils/date";
import {StatusCode, StatusMessage} from "@/constant/status";
import {findRepairDetail, updateRepairItemStatus} from "@/api/dorm-repair";

const RepairModal: React.FC<API.DetailModalProps> = ({visible, data: id, callback, hidden}: API.DetailModalProps) => {
    const [data, setData] = useState<API.RepairItem>();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        fetchData(id).finally();
    }, [id]);

    const fetchData = async (id: number) => {
        if (!id) return;
        setLoading(true);
        const {code, data} = await findRepairDetail(id);
        if (code != StatusCode.OK) {
            Message.error(StatusMessage.FETCH_DATA_ERROR);
            return;
        }
        setData(data);
        setTimeout(() => {
            setLoading(false);
        }, 500);
    };

    const doOk = async () => {
        try {
            const {code} = await updateRepairItemStatus(data.id);
            if (code != StatusCode.OK) {
                Message.error(StatusMessage.UPDATE_STATUS_ERROR);
                return;
            }
            data.status = true;
            callback && callback(data);
            Message.success(StatusMessage.UPDATE_STATUS_OK);
        } catch (e) {
            Message.error(StatusMessage.NETWORK_ERROR);
        }
    };

    const doCancel = () => {
        hidden();
    }

    // const getRows = (data: API.RepairItem) => {
    const getRows = (data: any) => {
        if (!data) return [];
        return [{
            label: '报修内容',
            value: data.itemName
        }, {
            label: '详情描述',
            value: data.description
        }, {
            label: '宿舍楼号',
            value: data.dorm
        }, {
            label: '房间号',
            value: data.room
        }, {
            label: '学生姓名',
            value: data.owner ? `${data.owner?.stuName} (${data.owner?.stuId})` : ""
        }, {
            label: '联系方式',
            value: `[电话] ${data.contactNumber}`
        }, {
            label: '报修时间',
            value: formatDate(data.updatedAt)
        }, {
            label: '当前状态',
            value: data.status ? (<Tag color="#00b42a">已处理</Tag>) : (<Tag color="#f53f3f">未处理</Tag>)
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
            okText='完成'
            okButtonProps={{
                disabled: data?.status && true
            }}
        >
            <Spin loading={loading} style={{width: "100%"}}>
                <Descriptions
                    column={1}
                    data={getRows(data)}
                    style={{marginBottom: 20}}
                    labelStyle={{paddingRight: 36}}
                />
            </Spin>
        </Modal>
    )
}
export default RepairModal;