import React, {useEffect, useState} from 'react';
import {Badge, Button, Card, Message, PaginationProps, Popconfirm, Space, Table} from '@arco-design/web-react';
import {IconDelete} from '@arco-design/web-react/icon';
import LostAndFoundDetail from "@/pages/lostandfound/LostAndFoundDetail";
import {substrAndEllipsis} from "@/utils/string";
import {deleteLAFById, getLAFList} from "@/api/lostandfound";
import {StatusCode, StatusMessage} from "@/constant/status";

function LostAndFound() {
    const [data, setData] = useState<API.LostAndFound[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [visible, setVisible] = useState<boolean>(false);
    const [currentItem, setCurrentItem] = useState<API.LostAndFound>(null);
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
        const {code, data}: API.Response = await getLAFList(
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

    const onView = (record: API.LostAndFound) => {
        setCurrentItem(record);
        setVisible(true);
    }

    const onDelete = async (record: API.LostAndFound) => {
        const {code}: API.Response = await deleteLAFById(record.id);
        if (code != StatusCode.OK) {
            Message.error(StatusMessage.DELETE_FAILED);
            return;
        }
        setData(data.filter(item => item.id !== record.id));
        Message.success(StatusMessage.DELETE_OK);
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
            render: (_, record: API.LostAndFound) => (
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
