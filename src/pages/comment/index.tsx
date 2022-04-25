import React, {useState, useEffect} from 'react';
import {Table, Card, PaginationProps, Space, Button, Popconfirm, Badge} from '@arco-design/web-react';
import {IconDelete} from '@arco-design/web-react/icon';
import dayjs from 'dayjs';
import CommentDetail from "@/pages/comment/CommentDetail";

interface IComment {
    id: number;
    stuName: string;
    content: string;
    time: string;
    status: boolean;
}

function Comment() {
    const [data, setData] = useState<IComment[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [visible, setVisible] = useState(false);
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

    function fetchData() {
        const data = [
            {id: 1, stuName: '张三', content: "山西省 忻州市 五台县", time: '2020-01-01', status: false},
            {id: 2, stuName: '李四', content: "山西省 忻州市 五台县", time: '2020-01-01', status: true},
            {id: 3, stuName: '王五', content: "山西省 忻州市 五台县", time: '2020-01-01', status: false},
            {id: 4, stuName: '赵六', content: "山西省 忻州市 五台县", time: '2020-01-01', status: true},
            {id: 5, stuName: '田七', content: "山西省 忻州市 五台县", time: '2020-01-01', status: false},
            {id: 6, stuName: '田七', content: "山西省 忻州市 五台县", time: '2020-01-01', status: true},
            {id: 7, stuName: '田七', content: "山西省 忻州市 五台县", time: '2020-01-01', status: true},
            {id: 8, stuName: '田七', content: "山西省 忻州市 五台县", time: '2020-01-01', status: false},
            {id: 9, stuName: '田七', content: "山西省 忻州市 五台县", time: '2020-01-01', status: true},
            {id: 10, stuName: '田七', content: "山西省 忻州市 五台县", time: '2020-01-01', status: false},
            {id: 11, stuName: '田七', content: "山西省 忻州市 五台县", time: '2020-01-01', status: true},
            {id: 12, stuName: '田七', content: "山西省 忻州市 五台县", time: '2020-01-01', status: false},
        ];
        setData(data);
        setLoading(false);
    }


    const onView = (record: IComment) => {
        setCurrentId(record.id);
        setVisible(true);
    }

    const onDelete = (record: IComment) => {
        console.log(record);
    }

    const doCallback = (newItem: IComment) => {
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
            title: "姓名",
            dataIndex: 'stuName',
        },
        {
            title: "内容",
            dataIndex: 'content',
            render: (value: string) => (
                <span>{value?.length < 30 ? value : value?.substring(0, 30) + "..."}</span>
            ),
        },
        {
            title: "时间",
            dataIndex: 'time',
            render: (value) => value ? dayjs(value).format('YYYY-MM-DD HH:mm:ss') : '',
        },
        {
            title: "是否回复",
            dataIndex: 'status',
            render: (value: boolean) => (
                <>
                    {
                        value ? <Badge status="success" text="已回复"/> : <Badge status="error" text="未回复"/>
                    }
                </>
            ),
        },
        {
            title: "操作",
            dataIndex: 'operations',
            width: 200,
            render: (_, record: IComment) => (
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
            <CommentDetail visible={visible} id={currentId} callback={doCallback} hidden={doHidden}/>
        </>
    );
}

export default Comment;
