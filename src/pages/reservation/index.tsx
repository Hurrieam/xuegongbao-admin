import React, {useEffect, useState} from 'react';
import {Badge, Button, Card, Message, PaginationProps, Popconfirm, Space, Table} from '@arco-design/web-react';
import {IconDelete} from '@arco-design/web-react/icon';
import {IResponse} from "@/types";
import {substrAndEllipsis} from "@/utils/string";
import {deleteReservationById, getReservationList} from "@/api/reservation";
import ReservationDetail from './ReservationDetail';

export interface IReservation {
    id: number;
    type: string;
    stuName: string;
    sdept: string;
    content: string;
    time: string;
    contact: string;
    status: boolean;
}

function Reservation() {
    const [data, setData] = useState<IReservation[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [visible, setVisible] = useState<boolean>(false);
    const [currentItem, setCurrentItem] = useState<IReservation>(null);
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
        const {code, data}: IResponse = await getReservationList(
            (pagination.current - 1) * pagination.pageSize,
            pagination.pageSize
        );
        if (code != 10000) {
            Message.error("获取数据失败!");
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

    const onView = (record: IReservation) => {
        setCurrentItem(record);
        setVisible(true);
    }

    const onDelete = async (record: IReservation) => {
        const {code}: IResponse = await deleteReservationById(record.id);
        if (code != 10000) {
            Message.error("删除失败");
            return;
        }
        setData(data.filter(item => item.id !== record.id));
        Message.success("删除成功");
    }

    const doCallback = (newItem: IReservation) => {
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
            dataIndex: 'stuName'
        },
        {
            title: "院系",
            dataIndex: 'sdept'
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
            render: (_, record: IReservation) => (
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
            <ReservationDetail visible={visible} data={currentItem} callback={doCallback} hidden={doHidden}/>
        </>
    );
}


export default Reservation;
