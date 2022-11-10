import React, {useEffect, useState} from 'react';
import {Badge, Button, Card, Message, PaginationProps, Popconfirm, Space, Table} from '@arco-design/web-react';
import {IconDelete} from '@arco-design/web-react/icon';
import {formatDate} from "@/utils/date";
import {StatusCode, StatusMessage} from "@/constant/status";
import {deleteRepairItem, findRepairList} from "@/api/dorm-repair";
import RepairModal from "@/pages/repairs/RepairModal";

const DormRepairPage: React.FC = () => {
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
        const {code, data}: API.Response = await findRepairList(
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

    const onView = (record: API.RepairItem) => {
        setCurrentItem(record);
        setVisible(true);
    }

    const onDelete = async (record: API.RepairItem) => {
        const {code}: API.Response = await deleteRepairItem(record.id);
        if (code != StatusCode.OK) {
            Message.error(StatusMessage.DELETE_FAILED);
            return;
        }
        setData(data.filter(item => item.id !== record.id));
        Message.success(StatusMessage.DELETE_OK);
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
                        <Button type="primary" size="small" onClick={onView.bind(this, record)}>查看</Button>
                        <Popconfirm
                            title='确定删除吗?'
                            onOk={onDelete.bind(this, record)}
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
            <RepairModal visible={visible} data={currentItem?.id} callback={doCallback} hidden={doHidden}/>
        </>
    );
}

export default DormRepairPage;
