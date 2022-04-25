import React from 'react';
import {Link, Card, Divider, Message} from '@arco-design/web-react';
import {
    IconFile,
    IconStorage,
    IconSettings,
    IconMobile,
    IconFire,
} from '@arco-design/web-react/icon';
import styles from './style/shortcuts.module.less';

interface IShortcuts {
    title: string;
    link: string;
    icon: React.ReactNode;
}

function Shortcuts() {

    const shortcuts: IShortcuts[] = [
        {
            title: "学院官网",
            link: 'http://www.xjtucc.cn/',
            icon: <IconSettings/>,
        },
        {
            title: "学工信息网",
            link: 'http://xsc.xjtucc.cn/',
            icon: <IconFile/>,
        },
        {
            title: "教务系统",
            link: 'http://jxgl.xjtucc.cn/',
            icon: <IconStorage/>,
        },
        {
            title: "通知公告",
            link: 'http://www.xjtucc.cn/index/tzgg.htm',
            icon: <IconMobile/>,
        },
    ];

    const onClickShortcut = (item: IShortcuts) => {
        window.open(item.link);
    };

    return (
        <Card title="快捷入口" headerStyle={{borderBottom: 0}}>
            <div className={styles.shortcuts}>
                {shortcuts.map((shortcut) => (
                    <div className={styles.item} key={shortcut.title} onClick={() => onClickShortcut(shortcut)}>
                        <div className={styles.icon}>{shortcut.icon}</div>
                        <div className={styles.title}>{shortcut.title}</div>
                    </div>
                ))}
            </div>
        </Card>
    );
}

export default Shortcuts;
