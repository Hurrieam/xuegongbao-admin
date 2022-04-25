import React from 'react';
import {Tooltip} from '@arco-design/web-react';
import {IconSunFill, IconMoonFill, IconPoweroff} from '@arco-design/web-react/icon';
import {useSelector, useDispatch} from 'react-redux';
import {GlobalState} from '@/store';
import Logo from '@/assets/logo.svg';
import IconButton from './IconButton';
import storage from '@/utils/storage';
import styles from './style/index.module.less';

function Navbar() {
    const theme = useSelector((state: GlobalState) => state.theme);
    const dispatch = useDispatch();

    const logout = () => {
        storage.setItem('userStatus', 'logout');
        window.location.href = '/login';
    }

    return (
        <div className={styles.navbar}>
            <div className={styles.left}>
                <div className={styles.logo}>
                    <Logo/>
                    <div className={styles['logo-name']}>学工宝管理</div>
                </div>
            </div>
            <ul className={styles.right}>
                <li>
                    <Tooltip content={theme === 'light' ? "点击切换为暗黑模式" : "点击切换为亮色模式"}>
                        <IconButton
                            type="default"
                            icon={theme === 'light' ? <IconMoonFill/> : <IconSunFill/>}
                            onClick={() =>
                                dispatch({
                                    type: 'toggle-theme',
                                    payload: {theme: theme === 'light' ? 'dark' : 'light'},
                                })
                            }
                        />
                    </Tooltip>
                </li>
                <li>
                    <Tooltip content="退出登录">
                        <IconButton type="default" icon={<IconPoweroff/>} onClick={logout}/>
                    </Tooltip>
                </li>
            </ul>
        </div>
    );
}

export default Navbar;
