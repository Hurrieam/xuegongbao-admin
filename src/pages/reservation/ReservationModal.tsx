import React, {useEffect, useState} from 'react';
import {Descriptions, Message, Modal, Spin, Tag} from '@arco-design/web-react';
import {StatusCode, StatusMessage} from "@/constant/status";
import {findReservationDetail, updateReservationStatus} from "@/api/reservation";
import {formatDate} from "@/utils/date";
import UserPopover from "@/components/UserPopover";

const ReservationModal: React.FC<API.DetailModalProps> = ({visible, data: id, callback, hidden}) => {
    const [data, setData] = useState<API.Reservation>();
    const [loading, setLoading] = React.useState(false);
    useEffect(() => {
        fetchData(id).finally();
    }, [id]);

    const fetchData = async (id: number) => {
        if (!id) return;
        setLoading(true);
        const {code, data} = await findReservationDetail(id);
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
            const {code} = await updateReservationStatus(data.id);
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

    // const getRows = (data: API.Reservation) => {
    const getRows = (data: any) => {
        if (!data) return [];
        return [{
            label: '咨询类型',
            value: data.type,
        }, {
            label: '学生姓名',
            value: <UserPopover user={data.owner}/>
        }, {
            label: '所在班级',
            value: data.owner?.stuClass
        }, {
            label: '咨询内容',
            value: data.content
        }, {
            label: '预定时间',
            value: formatDate(data.date, "yyyy年MM月dd日")
        }, {
            label: '联系方式',
            value: `[${data.contactMethod}] ${data.contactNumber}`
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
export default ReservationModal;