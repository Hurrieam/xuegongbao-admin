import React, {useState, useEffect, ReactNode} from 'react';
import {Grid, Typography, Divider, Skeleton} from '@arco-design/web-react';
import OverviewAreaLine from '@/components/Chart/overview-area-line';
import axios from 'axios';
import styles from './style/overview.module.less';
import IconCalendar from './assets/calendar.svg';
import IconComments from './assets/comments.svg';
import IconContent from './assets/content.svg';
import IconIncrease from './assets/increase.svg';

const {Row, Col} = Grid;

type StatisticItemType = {
    icon?: ReactNode;
    title?: ReactNode;
    count?: ReactNode;
    loading?: boolean;
    unit?: ReactNode;
};

function StatisticItem(props: StatisticItemType) {
    const {icon, title, count, loading, unit} = props;
    return (
        <div className={styles.item}>
            <div className={styles.icon}>{icon}</div>
            <div>
                <Skeleton loading={loading} text={{rows: 2, width: 60}} animation>
                    <div className={styles.title}>{title}</div>
                    <div className={styles.count}>
                        {count}
                        <span className={styles.unit}>{unit}</span>
                    </div>
                </Skeleton>
            </div>
        </div>
    );
}

type DataType = {
    allContents?: string;
    liveContents?: string;
    increaseComments?: string;
    growthRate?: string;
    chartData?: { count?: number; date?: string }[];
    down?: boolean;
};

function Overview() {
    const [data, setData] = useState<DataType>({});
    const [loading, setLoading] = useState(true);

    const fetchData = () => {
        setLoading(true);
        axios
            .get('/api/workplace/overview-content')
            .then((res) => {
                setData(res.data);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className={styles.container}>
            <Typography.Title heading={5} style={{marginTop: 0}}>
                欢迎回来
            </Typography.Title>
            <Divider/>
            <Row>
                <Col flex={1}>
                    <StatisticItem
                        icon={<IconCalendar/>}
                        title="今日使用人数"
                        count={data.allContents}
                        loading={loading}
                        unit="个"
                    />
                </Col>
                <Divider type="vertical" className={styles.divider}/>
                <Col flex={1}>
                    <StatisticItem
                        icon={<IconContent/>}
                        title="今日留言数"
                        count={data.liveContents}
                        loading={loading}
                        unit="条"
                    />
                </Col>
                <Divider type="vertical" className={styles.divider}/>
                <Col flex={1}>
                    <StatisticItem
                        icon={<IconComments/>}
                        title="今日报修单数"
                        count={data.increaseComments}
                        loading={loading}
                        unit="单"
                    />
                </Col>
                <Divider type="vertical" className={styles.divider}/>
                <Col flex={1}>
                    <StatisticItem
                        icon={<IconIncrease/>}
                        title="今日反馈数"
                        count={data.increaseComments}
                        loading={loading}
                        unit="条"
                    />
                </Col>
            </Row>
            <Divider/>
            <div>
                <div className={styles.ctw}>
                    <Typography.Paragraph
                        className={styles['chart-title']}
                        style={{marginBottom: 0}}
                    >
                        使用人数
                        <span className={styles['chart-sub-title']}> 近1年</span>
                    </Typography.Paragraph>
                </div>
                <OverviewAreaLine data={data.chartData} loading={loading}/>
            </div>
        </div>
    );
}

export default Overview;
