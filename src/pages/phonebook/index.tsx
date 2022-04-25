import React, {useState, useEffect} from 'react';
import {Table, Card, PaginationProps, Popconfirm, Button} from '@arco-design/web-react';
import {IconPlus, IconDelete} from '@arco-design/web-react/icon';
import PhoneEditor from "@/pages/phonebook/PhoneEditor";

interface IPhoneBook {
    id: number;
    deptName: string;
    phone: string;
}

const PhoneBook: React.FC = () => {
    const [data, setData] = useState<IPhoneBook[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [visible, setVisible] = useState<boolean>(false);
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
            {id: 1, deptName: '财务部', phone: '123456789'},
            {id: 2, deptName: '人事部', phone: '123456789'},
            {id: 3, deptName: '销售部', phone: '123456789'},
            {id: 4, deptName: '技术部', phone: '123456789'},
            {id: 5, deptName: '行政部', phone: '123456789'},
            {id: 6, deptName: '财务部', phone: '123456789'}
        ];
        setData(data);
        setLoading(false);
    }

    const doCallback = () => {
        setVisible(false);
        fetchData();
    }

    const doHidden = () => {
        setVisible(false);
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

    const onAdd = () => {
        setVisible(true);
    }
    const onDelete = (record: IPhoneBook) => {
        console.log(record);
    }

    const onChangeTable = (pagination) => {
        setPatination(pagination);
    }

    return (
        <>
            <Card>
                <div style={{marginBottom: "8px"}}>
                    <Button type="primary" icon={<IconPlus/>} onClick={onAdd}>添加</Button>
                </div>
                <Table
                    rowKey="id"
                    loading={loading}
                    onChange={onChangeTable}
                    columns={columns}
                    data={data}
                    stripe={true}
                    border={true}
                />
                <PhoneEditor visible={visible} callback={doCallback} hidden={doHidden}/>
            </Card>
        </>
    );
}

export default PhoneBook;
