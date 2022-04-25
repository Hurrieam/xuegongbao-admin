import React, {useState, useEffect} from 'react';
import {Table, Card, PaginationProps, Space, Button, Popconfirm, Badge} from '@arco-design/web-react';
import {IconDelete} from '@arco-design/web-react/icon';
import dayjs from 'dayjs';
import FeedbackDetail from "@/pages/feedback/FeedbackDetail";

interface IFeedback {
    id: number;
    stuName: string;
    content: string;
    time: string;
    isHandled: boolean;
}

const Feedback = () => {
    const [data, setData] = useState<IFeedback[]>([]);
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
            {id: 1, stuName: '张三', content: "山西省 忻州市 五台县", time: '2020-01-01', isHandled: false},
            {id: 2, stuName: '李四', content: "山西省 忻州市 五台县", time: '2020-01-01', isHandled: false},
            {id: 3, stuName: '王五', content: "山西省 忻州市 五台县", time: '2020-01-01', isHandled: false},
            {id: 4, stuName: '赵六', content: "山西省 忻州市 五台县", time: '2020-01-01', isHandled: true},
            {id: 5, stuName: '田七', content: "山西省 忻州市 五台县", time: '2020-01-01', isHandled: true},
            {id: 6, stuName: '田七', content: "山西省 忻州市 五台县", time: '2020-01-01', isHandled: true},
            {id: 7, stuName: '田七', content: "山西省 忻州市 五台县", time: '2020-01-01', isHandled: false},
        ];
        setData(data);
        setLoading(false);
    }

    const onView = (record: IFeedback) => {
        setCurrentId(record.id);
        setVisible(true);
    }

    const onDelete = (record: IFeedback) => {
        console.log(record);
    }

    const doCallback = (newItem: IFeedback) => {
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
            render: (_, record: IFeedback) => (
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
            <FeedbackDetail visible={visible} id={currentId} callback={doCallback} hidden={doHidden}/>
        </>
    );
}

export default Feedback;
