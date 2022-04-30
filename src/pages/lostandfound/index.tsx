import React, {useEffect, useState} from 'react';
import {Badge, Button, Card, Message, PaginationProps, Popconfirm, Space, Table} from '@arco-design/web-react';
import {IconDelete} from '@arco-design/web-react/icon';
import LostAndFoundDetail from "@/pages/lostandfound/LostAndFoundDetail";
import {deleteLAF, getLAFs} from "@/api/lostandfound";
import {IResponse} from "@/types";
import {substrAndEllipsis} from "@/utils/string";

export interface ILostAndFound {
    id: number;
    openid?: string;
    itemName: string;
    location?: string;
    lostTime?: string;
    description: string;
    images?: string;
    stuName?: string;
    contact: string;
    status?: boolean;
}

function LostAndFound() {
    const [data, setData] = useState<ILostAndFound[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [visible, setVisible] = useState<boolean>(false);
    const [currentItem, setCurrentItem] = useState<ILostAndFound>(null);
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
        const {code, data}: IResponse = await getLAFs(
            (pagination.current - 1) * pagination.pageSize,
            pagination.pageSize
        );
        if (code != 10000) {
            Message.error("获取失物招领信息失败");
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

    const onView = (record: ILostAndFound) => {
        setCurrentItem(record);
        setVisible(true);
    }

    const onDelete = async (record: ILostAndFound) => {
        console.log(record);
        const {code}: IResponse = await deleteLAF(record.id);
        if (code != 10000) {
            Message.error("删除失物招领信息失败");
            return;
        }
        setData(data.filter(item => item.id !== record.id));
        Message.success("删除失物招领信息成功");
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
            title: "物品名称",
            dataIndex: 'itemName',
        },
        {
            title: "丢失地点",
            dataIndex: 'location',
            render: (value: string) => (
                <span>{value ? value : "未知"}</span>
            )
        },
        {
            title: "描述",
            dataIndex: 'description',
            width: 250,
            render: (value: string) => (
                <span>{substrAndEllipsis(value, 25)}</span>
            ),
        },
        {
            title: "丢失时间",
            dataIndex: 'lostTime',
            render: (value: string) => (
                <span>{value ? value : "未知"}</span>
            )
        },
        {
            title: "状态",
            dataIndex: 'status',
            render: (value: boolean) => (
                <>
                    {
                        value ? <Badge status="success" text="已找到"/> : <Badge status="error" text="未找到"/>
                    }
                </>
            ),
        },
        {
            title: "操作",
            dataIndex: 'operations',
            width: 200,
            render: (_, record: ILostAndFound) => (
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
            <LostAndFoundDetail visible={visible} data={currentItem} hidden={doHidden}/>
        </>
    );
}


export default LostAndFound;
