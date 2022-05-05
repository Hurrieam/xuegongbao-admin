import React, {useEffect, useState} from 'react';
import {Badge, Button, Card, Message, PaginationProps, Popconfirm, Space, Table} from '@arco-design/web-react';
import {IconDelete} from '@arco-design/web-react/icon';
import CommentDetail from "@/pages/comment/CommentDetail";
import {formatDate} from "@/utils/date";
import {substrAndEllipsis} from "@/utils/string";
import {deleteCommentById, getCommentList} from "@/api/comment";
import {StatusCode, StatusMessage} from "@/constant/status";

const Comment = () => {
    const [data, setData] = useState<API.Comment[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [visible, setVisible] = useState(false);
    const [currentItem, setCurrentItem] = useState<API.Comment>();
    const [pagination, setPagination] = useState<PaginationProps>({
        sizeCanChange: false,
        showTotal: true,
        total: 0,
        pageSize: 10,
        current: 1
    });

    useEffect(() => {
        fetchData();
        return () => {
            setData([]);
        };
    }, [pagination.current]);

    const fetchData = async () => {
        const {code, data}: API.Response = await getCommentList(
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

    const onView = (record: API.Comment) => {
        setCurrentItem(record);
        setVisible(true);
    }

    const onDelete = async (record: API.Comment) => {
        const {code}: API.Response = await deleteCommentById(record.id);
        if (code != StatusCode.OK) {
            Message.error(StatusMessage.DELETE_FAILED);
            return;
        }
        setData(data.filter(item => item.id !== record.id));
        Message.success(StatusMessage.DELETE_OK);
    }

    const doCallback = (id: number) => {
        setData(data.map(item => item.id === id ? {...currentItem, hasReply: true} : item));
    }

    const doHidden = () => {
        setVisible(false);
    }

    const onChangeTable = async (pagination) => {
        setPagination(pagination);
    }

    const columns = [
        {
            title: "ID",
            dataIndex: 'id'
        },
        {
            title: "姓名",
            dataIndex: 'stuName',
            render: (value: string) => (
                <span>{value ? value : "***"}</span>
            )
        },
        {
            title: "内容",
            dataIndex: 'content',
            width: 400,
            render: (value: string) => (
                <span>{substrAndEllipsis(value, 23)}</span>
            ),
        },
        {
            title: "时间",
            dataIndex: 'createdAt',
            width: 200,
            render: (value) => value ? formatDate(value) : '',
        },
        {
            title: "是否回复",
            dataIndex: 'hasReply',
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
            render: (_, record: API.Comment) => (
                <>
                    <Space>
                        <Button type="primary" size="small" onClick={() => onView(record)}>回复</Button>
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
            <CommentDetail visible={visible} data={currentItem?.id} callback={doCallback} hidden={doHidden}/>
        </>
    );
}

export default Comment;
