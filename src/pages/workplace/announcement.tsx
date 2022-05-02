import React, {useEffect, useState} from 'react';
import {Card, Skeleton, Tag} from '@arco-design/web-react';
import styles from './style/announcement.module.less';

function Announcement() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        // axios
        //     .get('/api/workplace/announcement')
        //     .then((res) => {
        //         setData(res.data);
        //     })
        //     .finally(() => {
        //         setLoading(false);
        //     });
        setLoading(false);
    };

    function getTagColor(type) {
        switch (type) {
            case 'activity':
                return 'orangered';
            case 'info':
                return 'cyan';
            case 'notice':
                return 'arcoblue';
            default:
                return 'arcoblue';
        }
    }

    return (
        <Card title="公告" headerStyle={{borderBottom: 0}}>
            <Skeleton loading={loading} text={{rows: 5, width: '100%'}} animation>
                <div>
                    {
                        data.length > 0 ? (
                            data.map((d) => (
                                <div key={d.key} className={styles.item}>
                                    <Tag color={getTagColor(d.type)} size="small">
                                        {d.type}
                                    </Tag>
                                    <span className={styles.link}>{d.content}</span>
                                </div>
                            ))
                        ) : (
                            <div>暂无数据</div>
                        )
                    }
                </div>
            </Skeleton>
        </Card>
    );
}

export default Announcement;
