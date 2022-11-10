import {Card, Descriptions} from "@arco-design/web-react";
import React from "react";
import styles from "./style/index.module.less";
import logo from "./asset/onezol.jpg";

const System: React.FC = () => {
    const data = [{
        label: '名称',
        value: '西安交通大学城市学院学工宝',
    }, {
        label: '创建时间',
        value: '2022-04-25'
    }, {
        label: '当前版本',
        value: 'v2.0.0',
    }];
    return (
        <>
            <div className={styles.header}>
                <img alt='LOGO' src={logo}/>
                <h3>西安交通大学城市学院学工宝</h3>
            </div>
            <Card bordered>
                <Descriptions
                    column={1}
                    title='系统信息'
                    data={data}
                    style={{marginBottom: 20}}
                    labelStyle={{paddingRight: 36}}
                />
            </Card>
        </>
    )
};

export default System;