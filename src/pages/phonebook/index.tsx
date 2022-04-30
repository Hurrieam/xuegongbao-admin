import React, {useEffect, useState} from 'react';
import {Button, Card, Message, PaginationProps, Popconfirm, Table} from '@arco-design/web-react';
import {IconDelete, IconPlus} from '@arco-design/web-react/icon';
import PhoneEditor from "@/pages/phonebook/PhoneEditor";
import {IResponse} from "@/types";
import {deletePhoneNumber, getPhoneBook} from "@/api/phonebook";

export interface IPhoneBook {
    id?: number;
    deptName: string;
    phone: string;
}

const PhoneBook: React.FC = () => {
    const [data, setData] = useState<IPhoneBook[]>([]);
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
        const {code, data}: IResponse = await getPhoneBook(
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

    const doCallback =async () => {
       await fetchData();
    }

    const doHidden = () => {
        setVisible(false);
    }

    const onAdd = () => {
        setVisible(true);
    }

    const onDelete = async (record: IPhoneBook) => {
        const {code}: IResponse = await deletePhoneNumber(record.id);
        if (code != 10000) {
            Message.error("删除失败");
            return;
        }
        setData(data.filter(item => item.id !== record.id));
        Message.success("删除成功");
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
            title: "部门",
            dataIndex: 'deptName'
        },
        {
            title: "电话号码",
            dataIndex: 'phone'
        },
        {
            title: "操作",
            dataIndex: 'operations',
            width: 200,
            render: (_, record: IPhoneBook) => (
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

export default PhoneBook;
