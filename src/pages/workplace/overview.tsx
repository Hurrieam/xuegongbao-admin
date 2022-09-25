import React, {ReactNode, useEffect, useState} from 'react';
import {Divider, Grid, Message, Skeleton, Typography} from '@arco-design/web-react';
import OverviewAreaLine from '@/components/Chart/overview-area-line';
import styles from './style/overview.module.less';
import IconCalendar from './assets/calendar.svg';
import IconComments from './assets/comments.svg';
import IconContent from './assets/content.svg';
import IconIncrease from './assets/increase.svg';
import {findDayUsage, findMonthUsage} from "@/api/usage";

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
    dayUsers: number;
    dayMessages: number;
    dayRepairs: number;
    dayReservations: number;
};
type IChartData = {
    date: string;
    count: number;
}

function Overview() {
    const [data, setData] = useState<DataType>({
        dayUsers: 0,
        dayMessages: 0,
        dayRepairs: 0,
        dayReservations: 0,
    });
    const [loading, setLoading] = useState<boolean>(true);
    const [chartData, setChartData] = useState<IChartData[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        const {code: code1, data: data1} = await findDayUsage();
        if (code1 !== 10000) {
            Message.error("获取数据失败!");
            return;
        }
        setData(data1);
        const {code: code2, data: data2} = await findMonthUsage();
        if (code2 !== 10000) {
            Message.error("获取数据失败!");
            return;
        }
        const array = data2.map((item: any) => {
            return {
                date: formatDate(item.createdAt),
                count: item.users,
            }
        });
        setChartData(array);
        setLoading(false);
    };
    const formatDate = (myDate: string) => {
        const date = new Date(myDate);
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    }
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
                        count={data.dayUsers}
                        loading={loading}
                        unit="个"
                    />
                </Col>
                <Divider type="vertical" className={styles.divider}/>
                <Col flex={1}>
                    <StatisticItem
                        icon={<IconComments/>}
                        title="今日留言数"
                        count={data.dayMessages}
                        loading={loading}
                        unit="条"
                    />
                </Col>
                <Divider type="vertical" className={styles.divider}/>
                <Col flex={1}>
                    <StatisticItem
                        icon={<IconContent/>}
                        title="今日报修单数"
                        count={data.dayRepairs}
                        loading={loading}
                        unit="单"
                    />
                </Col>
                <Divider type="vertical" className={styles.divider}/>
                <Col flex={1}>
                    <StatisticItem
                        icon={<IconIncrease/>}
                        title="今日预约数"
                        count={data.dayReservations}
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
