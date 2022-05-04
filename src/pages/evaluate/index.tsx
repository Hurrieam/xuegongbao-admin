import React, {useEffect, useState} from 'react';
import {
    Button,
    Card,
    Grid,
    Message,
    PaginationProps,
    Popconfirm,
    Progress,
    Space,
    Statistic,
    Table
} from '@arco-design/web-react';
import {IconArrowFall, IconArrowRise, IconDelete} from '@arco-design/web-react/icon';
import {formatDate} from "@/utils/date";
import {StatusCode, StatusMessage} from "@/constant/status";
import EvalDetail from "@/pages/evaluate/EvalDetail";
import {deleteEvalById, getEvalList, getEvalSummary} from "@/api/eval";

const Row = Grid.Row;
const Col = Grid.Col;

interface ISummaryItem {
    name: string;  // cs, zk, mz, cy
    avgScore: number;
    rate: number;
}

const CanteenEval: React.FC = () => {
    const [data, setData] = useState<API.EvalItem[]>();
    const [summary, setSummary] = useState<ISummaryItem[]>();
    const [loading, setLoading] = useState<boolean>(true);
    const [visible, setVisible] = useState(false);
    const [currentItem, setCurrentItem] = useState<API.EvalItem>();
    const [pagination, setPagination] = useState<PaginationProps>({
        sizeCanChange: false,
        showTotal: true,
        total: 0,
        pageSize: 10,
        current: 1
    });
    const colors = ['#ff7d00', '#00b42a', '#0fc6c2', '#165dff'];
    const mapper = {
        cs: '城市餐厅',
        zk: '中快餐厅',
        mz: '民族餐厅',
        cy: '城苑餐厅'
    }

    useEffect(() => {
        (async () => {
            await fetchSummaryData();
            await fetchData();
            setLoading(false);
        })();
    }, []);

    // 获取总结数据
    const fetchSummaryData = async () => {
        const {code, data}: API.Response = await getEvalSummary();

        if (code != StatusCode.OK) {
            Message.error(StatusMessage.FETCH_DATA_ERROR);
            setLoading(false);
            return;
        }

        const {items} = data;
        setSummary(items);
    }

    // 获取评价列表
    const fetchData = async () => {
        const {code, data}: API.Response = await getEvalList(
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
    }

    const onView = (record: API.EvalItem) => {
        setCurrentItem(record);
        setVisible(true);
    }

    const onDelete = async (record: API.EvalItem) => {
        const {code}: API.Response = await deleteEvalById(record.id);
        if (code != StatusCode.OK) {
            Message.error(StatusMessage.DELETE_FAILED);
            return;
        }
        setData(data.filter(item => item.id !== record.id));
        Message.success(StatusMessage.DELETE_OK);
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
            title: "餐厅名称",
            dataIndex: 'canteenName',
            render: (value: string) => <span>{mapper[value]}</span>
        },
        {
            title: "主要问题",
            dataIndex: 'mainProblem',
            render: (value: string) => <span>{value}</span>
        },
        {
            title: "评价分数",
            dataIndex: "totalScore",
            render: (value: number) => <span>{value}</span>
        },
        {
            title: "时间",
            dataIndex: 'createdAt',
            width: 200,
            render: (value: string) => formatDate(value)
        },
        {
            title: "操作",
            dataIndex: 'operations',
            width: 200,
            render: (_, record: API.EvalItem) => (
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
            <Row>
                {
                    summary && summary.map((item, index) => (
                        <Col span={6} key={index}>
                            <Card>
                                <Row align='center'>
                                    <Col span={8}>
                                        <Progress
                                            type='circle'
                                            size="large"
                                            color={colors[index]}
                                            formatText={n => n + "分"}
                                            percent={item.avgScore}
                                            style={{wordBreak: "keep-all"}}/>
                                    </Col>
                                    <Col span={16}>
                                        <Statistic
                                            title='城市餐厅'
                                            value={item.rate}
                                            precision={2}
                                            prefix={item.rate > 0 ? <IconArrowRise/> : <IconArrowFall/>}
                                            suffix='%'
                                            countUp
                                            styleValue={{color: item.rate > 0 ? '#00b42a' : '#ee4d38'}}
                                        />
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    ))
                }
            </Row>
            <Card style={{marginTop: 15}}>
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
            <EvalDetail visible={visible} data={currentItem} hidden={doHidden}/>
        </>
    )
}

export default CanteenEval;