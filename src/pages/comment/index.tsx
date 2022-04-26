import React, {useState, useEffect} from 'react';
import {Table, Card, PaginationProps, Space, Button, Popconfirm, Badge, Message} from '@arco-design/web-react';
import {IconDelete} from '@arco-design/web-react/icon';
import CommentDetail from "@/pages/comment/CommentDetail";
import {deleteComment, getComments} from "@/api/comment";
import {IResponse} from "@/types";
import dayjs from 'dayjs';

export interface IComment {
    id?: number;
    openid?: string;
    parentId?: string;
    content: string;
    time: string;
    hasReply?: boolean;
}

const Comment = () => {
    const [data, setData] = useState<IComment[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [visible, setVisible] = useState(false);
    const [currentItem, setCurrentItem] = useState<IComment>();
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

    const fetchData = async () => {
        setLoading(true);
        const {code, data}: IResponse = await getComments(pagination.current, pagination.pageSize);
        if (code != 10000) {
            Message.error("获取评论失败");
            setLoading(false);
            return;
        }
        setData(data.items);
        setLoading(false);
    }

    const onView = (record: IComment) => {
        setCurrentItem(record);
        setVisible(true);
    }

    const onDelete = async (record: IComment) => {
        const {code} = await deleteComment(record.id);
        if (code != 10000) {
            Message.error("删除评论失败!");
            return;
        }
        setData(data.filter(item => item.id !== record.id));
        Message.success("删除评论成功!");
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
            render: (_, record: IComment) => (
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
                    onChange={onChangeTable}
                    columns={columns}
                    data={data}
                    stripe={true}
                    border={true}
                />
            </Card>
            <CommentDetail visible={visible} data={currentItem} callback={doCallback} hidden={doHidden}/>
        </>
    );
}

export default Comment;
