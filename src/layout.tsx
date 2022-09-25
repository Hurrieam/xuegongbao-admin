import React, {useMemo, useRef, useState} from 'react';
import {Link, Redirect, Route, Switch, useHistory} from 'react-router-dom';
import {Layout, Menu} from '@arco-design/web-react';
import {
    IconArchive,
    IconCommon,
    IconDashboard,
    IconFile,
    IconMenuFold,
    IconMenuUnfold,
    IconMessage,
    IconSubscribed,
    IconThumbUp,
    IconTool
} from '@arco-design/web-react/icon';
import {useSelector} from 'react-redux';
import qs from 'query-string';
import NProgress from 'nprogress';
import Navbar from './components/NavBar';
import Footer from './components/Footer';
import {defaultRoute, routes} from './routes';
import {isArray} from './utils/is';
import getUrlParams from './utils/getUrlParams';
import lazyload from './utils/lazyload';
import {GlobalState} from './store';
import styles from './style/layout.module.less';

const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

const Sider = Layout.Sider;
const Content = Layout.Content;

function getIconFromKey(key) {
    switch (key) {
        case 'dashboard/workplace':
            return <IconDashboard className={styles.icon}/>;
        case 'dashboard/phonebook':
            return <IconFile className={styles.icon}/>;
        case 'dashboard/message':
            return <IconMessage className={styles.icon}/>;
        case 'dashboard/reservation':
            return <IconSubscribed className={styles.icon}/>;
        case 'dashboard/repairs':
            return <IconTool className={styles.icon}/>;
        case 'dashboard/lostandfound':
            return <IconArchive className={styles.icon}/>;
        case 'dashboard/evaluate':
            return <IconThumbUp className={styles.icon}/>;
        case 'dashboard/system':
            return <IconCommon className={styles.icon}/>;
        default:
            return <div className={styles['icon-empty']}/>;
    }
}

function getFlattenRoutes() {
    const res = [];

    function travel(_routes) {
        _routes.forEach((route) => {
            if (route.key && !route.children) {
                route.component = lazyload(() => import(`./pages/${route.key.substring(10)}`));
                res.push(route);
            } else if (isArray(route.children) && route.children.length) {
                travel(route.children);
            }
        });
    }

    travel(routes);
    return res;
}

function PageLayout() {
    const urlParams = getUrlParams();
    const history = useHistory();
    const pathname = history.location.pathname;
    const currentComponent = qs.parseUrl(pathname).url.slice(1);
    const defaultSelectedKeys = [currentComponent || defaultRoute];
    const paths = (currentComponent || defaultRoute).split('/');
    const defaultOpenKeys = paths.slice(0, paths.length - 1);

    const settings = useSelector((state: GlobalState) => state.settings);

    // const [breadcrumb, setBreadCrumb] = useState([]);
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const [selectedKeys, setSelectedKeys] =
        useState<string[]>(defaultSelectedKeys);

    const routeMap = useRef<Map<string, React.ReactNode[]>>(new Map());

    const navbarHeight = 60;
    const menuWidth = collapsed ? 48 : settings.menuWidth;

    const showNavbar = settings.navbar && urlParams.navbar !== false;
    const showMenu = settings.menu && urlParams.menu !== false;
    const showFooter = settings.footer && urlParams.footer !== false;

    const flattenRoutes = useMemo(() => getFlattenRoutes() || [], []);

    function renderRoutes() {
        const nodes = [];

        function travel(_routes, level, parentNode = []) {
            return _routes.map((route) => {
                const {breadcrumb = true} = route;

                const iconDom = getIconFromKey(route.key);
                const titleDom = (
                    <>
                        {iconDom} {route.name}
                    </>
                );
                if (
                    route.component &&
                    (!isArray(route.children) ||
                        (isArray(route.children) && !route.children.length))
                ) {
                    routeMap.current.set(
                        `/${route.key}`,
                        breadcrumb ? [...parentNode, route.name] : []
                    );
                    if (level > 1) {
                        return <MenuItem key={route.key}>{titleDom}</MenuItem>;
                    }
                    nodes.push(
                        <MenuItem key={route.key}>
                            <Link to={`/${route.key}`}>{titleDom}</Link>
                        </MenuItem>
                    );
                }
                if (isArray(route.children) && route.children.length) {
                    const parentNode = [];
                    if (iconDom.props.isIcon) {
                        parentNode.push(iconDom);
                    }

                    if (level > 1) {
                        return (
                            <SubMenu key={route.key} title={titleDom}>
                                {travel(route.children, level + 1, [...parentNode, route.name])}
                            </SubMenu>
                        );
                    }
                    nodes.push(
                        <SubMenu key={route.key} title={titleDom}>
                            {travel(route.children, level + 1, [...parentNode, route.name])}
                        </SubMenu>
                    );
                }
            });
        }

        travel(routes, 1);
        return nodes;
    }

    function onClickMenuItem(key) {
        const currentRoute = flattenRoutes.find((r) => r.key === key);
        const component = currentRoute.component;
        const preload = component.preload();
        NProgress.start();
        preload.then(() => {
            setSelectedKeys([key]);
            history.push(currentRoute.path ? currentRoute.path : `/${key}`);
            NProgress.done();
        });
    }

    function toggleCollapse() {
        setCollapsed((collapsed) => !collapsed);
    }

    const paddingLeft = showMenu ? {paddingLeft: menuWidth} : {};
    const paddingTop = showNavbar ? {paddingTop: navbarHeight} : {};
    const paddingStyle = {...paddingLeft, ...paddingTop};

    return (
        <Layout className={styles.layout}>
            {showNavbar && (
                <div className={styles['layout-navbar']}>
                    <Navbar/>
                </div>
            )}
            <Layout>
                {showMenu && (
                    <Sider
                        className={styles['layout-sider']}
                        width={menuWidth}
                        collapsed={collapsed}
                        onCollapse={setCollapsed}
                        trigger={null}
                        collapsible
                        breakpoint="xl"
                        style={paddingTop}
                    >
                        <div className={styles['menu-wrapper']}>
                            <Menu
                                collapse={collapsed}
                                onClickMenuItem={onClickMenuItem}
                                selectedKeys={selectedKeys}
                                defaultOpenKeys={defaultOpenKeys}
                            >
                                {renderRoutes()}
                            </Menu>
                        </div>
                        <div className={styles['collapse-btn']} onClick={toggleCollapse}>
                            {collapsed ? <IconMenuUnfold/> : <IconMenuFold/>}
                        </div>
                    </Sider>
                )}
                <Layout className={styles['layout-content']} style={paddingStyle}>
                    <div className={styles['layout-content-wrapper']}>
                        <Content>
                            <Switch>
                                {flattenRoutes.map((route, index) => {
                                    return (
                                        <Route
                                            key={index}
                                            path={`/${route.key}`}
                                            component={route.component}
                                        />
                                    );
                                })}
                                <Redirect push to={`/${defaultRoute}`}/>
                            </Switch>
                        </Content>
                    </div>
                    {showFooter && <Footer/>}
                </Layout>
            </Layout>
        </Layout>
    );
}

export default PageLayout;
