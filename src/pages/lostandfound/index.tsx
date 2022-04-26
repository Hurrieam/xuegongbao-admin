import React, {useState, useEffect} from 'react';
import {Table, Card, PaginationProps, Space, Button, Popconfirm, Badge} from '@arco-design/web-react';
import {IconDelete} from '@arco-design/web-react/icon';
import LostAndFoundDetail from "@/pages/lostandfound/LostAndFoundDetail";

interface ILostAndFound {
    id: number;
    openid?: string;
    itemName: string;
    location: string;
    lostTime: string;
    description: string;
    images?: string;
    stuName?: string;
    contact?: string;
    status?: boolean;
}

function LostAndFound() {
    const [data, setData] = useState<ILostAndFound[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [visible, setVisible] = useState<boolean>(false);
    const [currentId, setCurrentId] = useState<number>(0);
    const [pagination, setPatination] = useState<PaginationProps>({
        sizeCanChange: true,
        showTotal: true,
        pageSize: 10,
        current: 1,
        pageSizeChangeResetCurrent: true,
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        const data = [
            {id: 1, itemName: '钢笔', location: '河南省郑州市', lostTime: '2020-01-01', description: '没有描述', status: false},
            {id: 2, itemName: '钢笔', location: '河南省郑州市', lostTime: '2020-01-01', description: '没有描述', status: true},
            {id: 3, itemName: '钢笔', location: '河南省郑州市', lostTime: '2020-01-01', description: '没有描述', status: false},
            {id: 4, itemName: '钢笔', location: '河南省郑州市', lostTime: '2020-01-01', description: '没有描述', status: true},
            {id: 5, itemName: '钢笔', location: '河南省郑州市', lostTime: '2020-01-01', description: '没有描述', status: false},
            {id: 6, itemName: '钢笔', location: '河南省郑州市', lostTime: '2020-01-01', description: '没有描述', status: true},
            {id: 7, itemName: '钢笔', location: '河南省郑州市', lostTime: '2020-01-01', description: '没有描述', status: false},
        ];
        setData(data);
        setLoading(false);
    }

    const onView = (record: ILostAndFound) => {
        setCurrentId(record.id);
        setVisible(true);
    }

    const onDelete = (record: ILostAndFound) => {
        console.log(record);
    }

    const doCallback = (newItem: ILostAndFound) => {
        setVisible(false);
        setData(data.map(item => item.id === newItem.id ? newItem : item));
    }

    const doHidden = () => {
        setVisible(false);
    }

    const onChangeTable = (pagination) => {
        setPatination(pagination);
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
            dataIndex: 'location'
        },
        {
            title: "描述",
            dataIndex: 'description',
            render: (value: string) => (
                <span>{value?.length < 30 ? value : value?.substring(0, 30) + "..."}</span>
            ),
        },
        {
            title: "丢失时间",
            dataIndex: 'lostTime'
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
                    onChange={onChangeTable}
                    columns={columns}
                    data={data}
                    stripe={true}
                    border={true}
                />
            </Card>
            <LostAndFoundDetail visible={visible} data={currentId} callback={doCallback} hidden={doHidden}/>
        </>
    );
}


export default LostAndFound;
