import React, {useEffect, useState} from 'react';
import {Button, Card, Message, PaginationProps, Popconfirm, Table} from '@arco-design/web-react';
import {IconDelete, IconPlus} from '@arco-design/web-react/icon';
import PhoneEditor from "@/pages/phonebook/PhoneBookModal";
import {deletePhoneNumber, findPhoneBookList,} from "@/api/phonebook";
import {StatusCode, StatusMessage} from "@/constant/status";

const PhoneBookPage: React.FC = () => {
    const [data, setData] = useState<API.PhoneBook[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [visible, setVisible] = useState<boolean>(false);
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
        const {code, data}: API.Response = await findPhoneBookList(
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

    const doCallback = async () => {
        await fetchData();
    }

    const doHidden = () => {
        setVisible(false);
    }

    const onAdd = () => {
        setVisible(true);
    }

    const onDelete = async (record: API.PhoneBook) => {
        const {code}: API.Response = await deletePhoneNumber(record.id);
        if (code != StatusCode.OK) {
            Message.error(StatusMessage.DELETE_FAILED);
            return;
        }
        setData(data.filter(item => item.id !== record.id));
        Message.success(StatusMessage.DELETE_OK);
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
            title: "类型",
            dataIndex: 'type',
            render: (value: string) => (
                <>
                    {value === "DEPT" && (<span>部门</span>)}
                    {value === "PEOPLE" && (<span>个人</span>)}
                </>
            )
        },
        {
            title: "名称",
            dataIndex: 'name'
        },
        {
            title: "电话号码",
            dataIndex: 'phone'
        },
        {
            title: "操作",
            dataIndex: 'operations',
            width: 200,
            render: (_, record: API.PhoneBook) => (
                <Popconfirm
                    title='确定删除吗?'
                    onOk={() => onDelete(record)}
                >
                    <Button type="primary" icon={<IconDelete/>} status="danger" size="small">删除</Button>
                </Popconfirm>
            ),
        },
    ];

    return (
        <>
            <Card>
                <div style={{marginBottom: "8px"}}>
                    <Button type="primary" icon={<IconPlus/>} onClick={onAdd}>添加</Button>
                </div>
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
                <PhoneEditor visible={visible} callback={doCallback} hidden={doHidden}/>
            </Card>
        </>
    );
}

export default PhoneBookPage;
