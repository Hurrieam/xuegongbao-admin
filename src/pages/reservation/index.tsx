import React, {useEffect, useState} from 'react';
import {Badge, Button, Card, Message, PaginationProps, Popconfirm, Space, Table} from '@arco-design/web-react';
import {IconDelete} from '@arco-design/web-react/icon';
import {substrAndEllipsis} from "@/utils/string";
import {StatusCode, StatusMessage} from "@/constant/status";
import ReservationModal from "@/pages/reservation/ReservationModal";
import {deleteReservation, findReservationList} from "@/api/reservation";
import {formatDate} from "@/utils/date";

const Reservation: React.FC = () => {
    const [data, setData] = useState<API.Reservation[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [visible, setVisible] = useState<boolean>(false);
    const [currentItem, setCurrentItem] = useState<API.Reservation>(null);
    const [pagination, setPagination] = useState<PaginationProps>({
        sizeCanChange: false,
        showTotal: true,
        total: 0,
        pageSize: 10,
        current: 1
    });

    useEffect(() => {
        fetchData();
    }, [pagination.current]);

    const fetchData = async () => {
        setLoading(true);
        const {code, data}: API.Response = await findReservationList(
            (pagination.current - 1) * pagination.pageSize,
            pagination.pageSize
        );
        if (code != StatusCode.OK) {
            Message.error(StatusMessage.FETCH_DATA_ERROR);
            setLoading(false);
            return;
        }
        const {items, total} = data;
        setData(items);
        setPagination({
            ...pagination,
            total
        });
        setLoading(false);
    }

    const onView = (record: API.Reservation) => {
        setCurrentItem(record);
        setVisible(true);
    }

    const onDelete = async (record: API.Reservation) => {
        const {code}: API.Response = await deleteReservation(record.id);
        if (code != StatusCode.OK) {
            Message.error(StatusMessage.DELETE_FAILED);
            return;
        }
        setData(data.filter(item => item.id !== record.id));
        Message.success(StatusMessage.DELETE_OK);
    }

    const doCallback = (newItem: API.Reservation) => {
        setData(data.map(item => item.id === newItem.id ? newItem : item));
    }

    const doHidden = () => {
        setVisible(false);
    }

    const onChangeTable = (pagination) => {
        setPagination(pagination);
    }

    const columns = [
        {
            title: "ID",
            dataIndex: 'id'
        },
        {
            title: "咨询类型",
            dataIndex: 'type',
        },
        {
            title: "学生姓名",
            dataIndex: 'stuName',
            render: (value) => value ? value : '***',
        },
        {
            title: "内容",
            dataIndex: 'content',
            render: (text) => substrAndEllipsis(text, 20)
        },
        {
            title: "状态",
            dataIndex: 'status',
            render: (value: boolean) => (
                <>
                    {
                        value ? <Badge status="success" text="已处理"/> : <Badge status="error" text="未处理"/>
                    }
                </>
            ),
        },
        {
            title: "操作",
            dataIndex: 'operations',
            width: 200,
            render: (_, record: API.Reservation) => (
                <>
                    <Space>
                        <Button type="primary" size="small" onClick={() => onView(record)}>查看</Button>
                        <Popconfirm
                            title='确定删除吗?'
                            onOk={() => onDelete(record)}
                        >
                            <Button type="primary" icon={<IconDelete/>} status="danger" size="small">删除</Button>
                        </Popconfirm>
                    </Space>
                </>
            ),
        },
    ];

    return (
        <>
            <Card>
                <Table
                    rowKey="id"
                    loading={loading}
                    columns={columns}
                    data={data}
                    stripe={true}
                    border={true}
                    pagination={pagination}
                    onChange={onChangeTable}
                />
            </Card>
            <ReservationModal visible={visible} data={currentItem?.id} callback={doCallback} hidden={doHidden}/>
        </>
    );
}


export default Reservation;
