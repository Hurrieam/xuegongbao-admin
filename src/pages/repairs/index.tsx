import React, {useEffect, useState} from 'react';
import {Badge, Button, Card, Message, PaginationProps, Popconfirm, Space, Table} from '@arco-design/web-react';
import {IconDelete} from '@arco-design/web-react/icon';
import RepairDetail from "@/pages/repairs/RepairDetail";
import {deleteRepairItemById, getRepairList} from "@/api/dorm-repair";
import {formatDate} from "@/utils/date";



const Repairs: React.FC = () => {
    const [data, setData] = useState<API.RepairItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [visible, setVisible] = useState<boolean>(false);
    const [currentItem, setCurrentItem] = useState<API.RepairItem>();
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
        const {code, data}: API.Response = await getRepairList(
            (pagination.current - 1) * pagination.pageSize,
            pagination.pageSize
        );
        if (code != 10000) {
            Message.error("获取数据失败");
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

    const onView = (record: API.RepairItem) => {
        setCurrentItem(record);
        setVisible(true);
    }

    const onDelete = async (record: API.RepairItem) => {
        const {code}: API.Response = await deleteRepairItemById(record.id);
        if (code != 10000) {
            Message.error("删除失败!");
            return;
        }
        setData(data.filter(item => item.id !== record.id));
        Message.success("删除成功!");
    }

    const doCallback = (newItem: API.RepairItem) => {
        setData(data.map(item => item.id === newItem.id ? newItem : item));
    }

    const doHidden = () => {
        setVisible(false);
    }

    function onChangeTable(pagination) {
        setPagination(pagination);
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
            dataIndex: 'createdAt',
            width: 200,
            render: (value) => value ? formatDate(value) : '',
        },
        {
            title: "是否处理",
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
            render: (_, record: API.RepairItem) => (
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
            <RepairDetail visible={visible} data={currentItem} callback={doCallback} hidden={doHidden}/>
        </>
    );
}

export default Repairs;
