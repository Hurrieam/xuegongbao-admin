import React, {useState, useEffect} from 'react';
import {Table, Card, PaginationProps, Space, Button, Popconfirm, Badge} from '@arco-design/web-react';
import {IconDelete} from '@arco-design/web-react/icon';
import RepairDetail from "@/pages/repairs/RepairDetail";

interface IRepairs {
    id: number;
    openid: string;
    itemName: string;
    description?: string;
    dorm: string;
    room: string;
    stuName?: string;
    contact: string;
    time: string;
    status: boolean;
}

const Repairs: React.FC = () => {
    const [data, setData] = useState<IRepairs[]>([]);
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
            {
                id: 1,
                openid: '1',
                itemName: '灯泡',
                dorm: '1号楼',
                room: '1-101',
                contact: '12345678901',
                status: true,
                time: '2020-01-01'
            },
            {
                id: 2,
                openid: '2',
                itemName: '电视',
                dorm: '1号楼',
                room: '1-101',
                contact: '12345678901',
                status: false,
                time: '2020-01-01'
            },
            {
                id: 3,
                openid: '3',
                itemName: '电脑',
                dorm: '1号楼',
                room: '1-101',
                contact: '12345678901',
                status: false,
                time: '2020-01-01'
            },
            {
                id: 4,
                openid: '4',
                itemName: '沙发',
                dorm: '1号楼',
                room: '1-101',
                contact: '12345678901',
                status: false,
                time: '2020-01-01'
            },
            {
                id: 5,
                openid: '5',
                itemName: '桌子',
                dorm: '1号楼',
                room: '1-101',
                contact: '12345678901',
                status: false,
                time: '2020-01-01'
            },
            {
                id: 6,
                openid: '6',
                itemName: '椅子',
                dorm: '1号楼',
                room: '1-101',
                contact: '12345678901',
                status: true,
                time: '2020-01-01'
            },
            {
                id: 7,
                openid: '7',
                itemName: '床',
                dorm: '1号楼',
                room: '1-101',
                contact: '12345678901',
                status: false,
                time: '2020-01-01'
            },
            {
                id: 8,
                openid: '8',
                itemName: '洗衣机',
                dorm: '1号楼',
                room: '1-101',
                contact: '12345678901',
                status: true,
                time: '2020-01-01'
            },
            {
                id: 9,
                openid: '9',
                itemName: '空调',
                dorm: '1号楼',
                room: '1-101',
                contact: '12345678901',
                status: false,
                time: '2020-01-01'
            },
            {
                id: 10,
                openid: '10',
                itemName: '电视',
                dorm: '1号楼',
                room: '1-101',
                contact: '12345678901',
                status: true,
                time: '2020-01-01'
            },
            {
                id: 11,
                openid: '11',
                itemName: '电视',
                dorm: '1号楼',
                room: '1-101',
                contact: '12345678901',
                status: true,
                time: '2020-01-01'
            }
        ];
        setData(data);
        setLoading(false);
    }

    const columns = [
        {
            title: "ID",
            dataIndex: 'id'
        },
        {
            title: "报修内容",
            dataIndex: 'itemName',
        },
        {
            title: "宿舍楼",
            dataIndex: 'dorm'
        },
        {
            title: "房间号",
            dataIndex: 'room'
        },
        {
            title: "时间",
            dataIndex: 'time',
        },
        {
            title: "是否处理",
            dataIndex: 'isHandled',
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
            render: (_, record: IRepairs) => (
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

    const onView = (record: IRepairs) => {
        setCurrentId(record.id);
        setVisible(true);
    }

    const onDelete = (record: IRepairs) => {
        console.log(record);
    }

    const doCallback = (newItem: IRepairs) => {
        setVisible(false);
        setData(data.map(item => item.id === newItem.id ? newItem : item));
    }
    const doHidden = () => {
        setVisible(false);
    }

    function onChangeTable(pagination) {
        setPatination(pagination);
    }

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
            <RepairDetail visible={visible} data={currentId} callback={doCallback} hidden={doHidden}/>
        </>
    );
}

export default Repairs;
