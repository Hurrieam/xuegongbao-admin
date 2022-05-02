import React, {ReactNode, useEffect, useState} from 'react';
import {Divider, Grid, Skeleton, Typography} from '@arco-design/web-react';
import OverviewAreaLine from '@/components/Chart/overview-area-line';
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

const StatisticItem: React.FC<StatisticItemType> = (props: StatisticItemType) => {
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
    todayUsers: number;
    todayComments: number;
    todayRepairs: number;
    todayReservations: number;
};
type IChartData = {
    date: string;
    count: number;
}

function Overview() {
    const [data, setData] = useState<DataType>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [chartData, setChartData] = useState<IChartData[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        setLoading(true);
        // TODO: 获取数据
        const data = {
            todayUsers: Math.floor(Math.random() * 100),
            todayComments: Math.floor(Math.random() * 100),
            todayRepairs: Math.floor(Math.random() * 100),
            todayReservations: Math.floor(Math.random() * 100),
        };
        const t = new Array(30).fill(0).map((_, index) => {
            const date = new Date();
            date.setDate(index);
            return {
                date: date.getMonth() + "月" + date.getDate() + '日',
                count: 88 + Math.floor(Math.random() * 100),
            }
        });
        setData(data);
        setChartData(t);
        setLoading(false);
    };

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
                        count={data?.todayUsers || '--'}
                        loading={loading}
                        unit="个"
                    />
                </Col>
                <Divider type="vertical" className={styles.divider}/>
                <Col flex={1}>
                    <StatisticItem
                        icon={<IconComments/>}
                        title="今日留言数"
                        count={data?.todayComments || '--'}
                        loading={loading}
                        unit="条"
                    />
                </Col>
                <Divider type="vertical" className={styles.divider}/>
                <Col flex={1}>
                    <StatisticItem
                        icon={<IconContent/>}
                        title="今日报修单数"
                        count={data?.todayRepairs || '--'}
                        loading={loading}
                        unit="单"
                    />
                </Col>
                <Divider type="vertical" className={styles.divider}/>
                <Col flex={1}>
                    <StatisticItem
                        icon={<IconIncrease/>}
                        title="今日预约数"
                        count={data?.todayReservations || '--'}
                        loading={loading}
                        unit="个"
                    />
                </Col>
            </Row>
            <Divider/>
            <div>
                <div className={styles.ctw}>
                    <Typography.Paragraph className={styles['chart-title']} style={{marginBottom: 0}}>
                        使用人数
                        <span className={styles['chart-sub-title']}> 近1个月</span>
                    </Typography.Paragraph>
                </div>
                <OverviewAreaLine data={chartData} loading={loading}/>
            </div>
        </div>
    );
}

export default Overview;
