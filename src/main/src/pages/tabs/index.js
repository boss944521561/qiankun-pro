import './index.less';
import React from 'react';
import ReactDOM from 'react-dom';
import env from '../../common/env';
import { registerMicroApps, runAfterFirstMounted, setDefaultMountApp, start, initGlobalState } from 'qiankun';
import { 
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Collapse,
    AppBar,
    Toolbar,
    Button,
    IconButton,
    Badge,
    Avatar,
    Menu,
    MenuItem,
    LinearProgress,
    Snackbar
} from '@material-ui/core';
import {
    ExpandLess,
    ExpandMore,
} from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import NotificationsIcon from '@material-ui/icons/Notifications';
import listData, { routeData } from './components/listData';
import FormatIndentDecreaseIcon from '@material-ui/icons/FormatIndentDecrease';
import FormatIndentIncreaseIcon from '@material-ui/icons/FormatIndentIncrease';
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';
import CloseIcon from '@material-ui/icons/Close';
import cookie from '~/cookie.js';
import tab_touxiang from '../../../public/static/touxiang.jpg';
export default class Tabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            alertList: [],
            anchorEl: null,
            tabsListActive: true,
            setAnchorEl: null,
            setMobileMoreAnchorEl: null,
            activeId: '',
            list: {},
            listKeys: []
        };
    }
    
    // 初始化子应用
    initSub(){
        // 注册子应用
        const loader = loading => {
            this.setState({ loading });
            // this.setState({ loading }, ()=>{
            //     ReactDOM.render(<>
            //     <div id="subview"/>
            //     </>, document.getElementById('subview-container'));
            // });
        };

        registerMicroApps(
            [
            {
                name: 'pmsr',
                entry: `${env.domain}:3001`,
                container: '#subview-container',
                loader,
                activeRule: '/pms/r',
            },
            {
                name: 'pmsv',
                entry: `${env.domain}:3002`,
                container: '#subview-container',
                loader,
                activeRule: '/pms/v',
            },
            ],
            // 挂载生命周期
            {
            beforeLoad: [
                app => {
                console.log('%c[主应用生命周期beforeLoad]', 'color: green;font-weight:bold;', app);
                }
            ],
            beforeMount: [
                app => {
                console.log('%c[主应用生命周期beforeMount]', 'color: green;font-weight:bold;', app);
                },
            ],
            afterUnmount: [
                app => {
                console.log('%c[主应用生命周期afterUnmount]', 'color: green;font-weight:bold;', app);
                },
            ],
            },
        );

        // 挂载状态管理器
        const { onGlobalStateChange } = initGlobalState({ user: 'main', listData, routeData });
        // 监听状态改变事件
        onGlobalStateChange((value, prev) => {
            console.log('%c[主应用main接收状态]', 'color: red;font-weight:bold;', value, prev);
        });

        // 默认进入的子应用
        setDefaultMountApp('/pms/r');

        // 启动应用
        start();

        // 第一个微应用 mount 后调用的方法 （可做监控/埋点等）
        runAfterFirstMounted(() => {
            console.log('%c[第一个子应用挂载好了]', 'color: blue;font-weight:bold;');
        });
    }

    // 初始化侧边栏
    initSidebar(){
        const { location } = this.props;
        const list = listData;
        const listKeys = Object.keys(listData);
        let activeId = '';
        // 路由匹配侧栏展示
        listKeys.map(v1 => {
            list[v1].data.map((v2, i2) => {
                v2.flag = false;
                if (location.pathname === v2.link) {
                    activeId = v2.id;
                }
                if (v2.children && v2.children.length) {
                    v2.children.map((v3, i3) => {
                        if (location.pathname === v3.link) {
                            activeId = v3.id;
                            v2.flag = true;
                            return;
                        }
                    })
                }
            });
        });
        this.setState({ list, listKeys, activeId });
    }

    // 点击侧栏item
    handleClickItem(v){
        const { history } = this.props;
        const { list, listKeys } = this.state;
        listKeys.map(v1 => {
            list[v1].data.map(v2 => {
                if (!v.id) { // 头
                    v2.flag = false;
                } else {
                    if (v.children && v.children.length) { // 有子
                        if (v.id === v2.id) { // 点自己取反
                            v.flag = !v.flag;
                        } else {  // 否则收起
                            v2.flag = false;
                        }
                    } else {
                        if (v.flag !== undefined) { // 不是点子点自己的子
                            v2.flag = false;
                        }
                    }
                }
            });
        });

        // 无跳转无子
        // if (!v.link && (!v.children || !v.children.length)) {
        //     return console.warn("该侧栏项未配置跳转地址");
        // }
        
        // 跳转
        if (v.link) {
            history.push(v.link);
        }
        this.setState({ list, activeId: v.id });
    };

    // 退出登录
    handleLogout() {
        cookie.delete('t');
        window.localStorage.removeItem('user')
        window.location.href = '/login';
    };

    // 关闭指定弹窗
    handleCloseMsg(obj) {
        const { alertList } = this.state;
        alertList.map((v, i)=>{
            if(v.key === obj.key) {
                return alertList.splice(i, 1);
            }
        });
        this.setState({ alertList });
    };

    // 打开弹窗
    handleOpenMsg(obj, time) {
        const { alertList } = this.state;
        // 生成唯一标识
        obj.key =  Date.now();
        alertList.push(obj);
        // 队列最多保留3个
        if (alertList.length > 2) {
            alertList.splice(0, alertList.length - 3);
        }
        this.setState({ alertList }, () => {
            // 计时删除
            let t = 3000;
            if (Object.prototype.toString.call(time) === '[object Number]' && !isNaN(time)) {
                t = time;
            };
            setTimeout(() => {
                this.handleCloseMsg(obj);
                this.setState({ alertList });
            }, t);
        });
    };

    // 操作Menu
    handleMenu(e) {
        this.setState({ anchorEl: e ? e.currentTarget : null });
    };

    // 是否展示TAB
    handleTabList() {
        const { tabsListActive } = this.state;
        this.setState({ tabsListActive: !tabsListActive });
    };

    // 全屏功能
    handleFullScreen() {
        try {
            // 退出全屏
            let e = document;
            const isFull = e.isFullScreen || e.mozIsFullScreen || e.webkitIsFullScreen || (e.body.scrollHeight == window.screen.height && e.body.scrollWidth == window.screen.width);
            const close = e.exitFullscreen || e.mozCancelFullScreen || e.webkitExitFullscreen;
            if (isFull) return close.call(e);
            // 打开全屏
            e = document.documentElement;
            const open = e.requestFullScreen || e.webkitRequestFullScreen || e.mozRequestFullScreen || e.msRequestFullscreen;
            open.call(e);
        } catch (err) {
            this.setState({ msg: "检查该浏览器是否支持全屏方法", btn: '联系Mason', btnBack: ()=>{} });
            console.warn("请检验全屏方法————", err);
        }
    };

    handleProfileMenuOpen(event) {
        this.setState({ setAnchorEl: event.currentTarget });
    };
    
    handleMobileMenuClose() {
        this.setState({ setMobileMoreAnchorEl: null });
    };

    handleMenuClose() {
        this.setState({ setAnchorEl: null }, () => {
            this.handleMobileMenuClose();
        });
    };

    handleMobileMenuOpen(event) {
        this.setState({ setMobileMoreAnchorEl: event.currentTarget });
    };

    render() {
        const { loading, activeId, list, listKeys, tabsListActive, alertList, anchorEl } = this.state;
        return (
            <div className="mainapp-main">
                {/* 左布局 侧栏 */}
                <div className={tabsListActive ? "tabsList-show tabsList" : "tabsList"}>
                    {listKeys.map((v1, i1) => {
                        return (
                            list[v1].data && list[v1].data.length ? <List key={i1}>
                                <div className="tabsList_header">
                                    <span className="tabsList_header_tit" onClick={e => {this.handleClickItem({ link: list[v1].link || '/' })}}>{v1}</span>
                                    {/* Performance Monitoring System */}
                                </div>
                                {list[v1].data.map((v2, i2) => {
                                    return (
                                        <React.Fragment key={i2}>
                                            <ListItem button onClick={e => {this.handleClickItem(v2)}} className={v2.id === activeId ? "tabsList_listItem tabsList_listItem_active" : "tabsList_listItem"}>
                                                <ListItemIcon>
                                                    {v2.icon}
                                                </ListItemIcon>
                                                <ListItemText primary={v2.name} />
                                                {v2.children && v2.children.length ? v2.flag ? <ExpandLess /> : <ExpandMore /> : null}
                                            </ListItem>

                                            {v2.children && v2.children.length ? <Collapse in={v2.flag} timeout="auto" unmountOnExit>
                                                <List>
                                                    {v2.children.map((v3, i3) => {
                                                        return (
                                                            <ListItem key={i3} button onClick={e => {this.handleClickItem(v3)}} className={v3.id === activeId ? "collapse_listItem tabsList_listItem tabsList_listItem_active" : "collapse_listItem tabsList_listItem"}>
                                                                <ListItemIcon>
                                                                    {v3.icon}
                                                                </ListItemIcon>
                                                                <ListItemText primary={v3.name} />
                                                            </ListItem>
                                                        )
                                                    })}
                                                </List>
                                            </Collapse> : null}
                                        </React.Fragment>
                                    );
                                })}
                            </List> : null
                        );
                    })}
                </div>
                
                {/* 右布局 */}
                <div className="mainapp-main-right">
                    <div className="mainapp-main-right-bg1"></div>
                    <div className="mainapp-main-right-bg2"></div>
                    {/* 顶栏 */}
                    <div>
                        <AppBar position="static" className="header_bar">
                            <Toolbar className="toolbar">
                                <div className="bar_left">
                                    <IconButton onClick={() => { this.handleTabList() }}>
                                        {tabsListActive ? <FormatIndentDecreaseIcon /> : <FormatIndentIncreaseIcon />}
                                    </IconButton>
                                    <IconButton onClick={() => { this.handleFullScreen() }}>
                                        <ZoomOutMapIcon />
                                    </IconButton>
                                </div>
                                <div className="bar_right">
                                    <IconButton onClick={() => { this.handleOpenMsg({ msg: "后台报警功能暂未开放", type: 'error' }) }}>
                                        <Badge badgeContent={17} color="secondary">
                                            <NotificationsIcon />
                                        </Badge>
                                    </IconButton>
                                    <Avatar className="pointer marginL" src={tab_touxiang} onClick={(e) => { this.handleMenu(e) }}/>
                                    <Menu
                                        anchorEl={anchorEl}
                                        keepMounted
                                        open={Boolean(anchorEl)}
                                        onClose={() => { this.handleMenu() }}
                                    >
                                        <MenuItem onClick={() => { this.handleOpenMsg({ msg: "修改信息功能暂未开放", type: 'warning' }) }}>修改信息</MenuItem>
                                        <MenuItem onClick={() => { this.handleOpenMsg({ msg: "修改密码功能暂未开放", btn: '联系Mason', btnBack: ()=>{} }) }}>修改密码</MenuItem>
                                        <MenuItem onClick={() => { this.handleLogout() }}>注销</MenuItem>
                                    </Menu>
                                </div>
                            </Toolbar>
                        </AppBar>
                        {/* loading */}
                        {loading && <LinearProgress color="secondary"/>}
                        {/* alert */}
                        {alertList.length ? <div className="alert_box">
                            {alertList.map((v, i) => <Snackbar
                                key={i}
                                className="alert_item"
                                open={true}
                                message={v.msg}
                                action={
                                    <React.Fragment>
                                        {v.btn ? <Button color="secondary" size="small" onClick={(i) => { v.btnBack && v.btnBack(i) }}>{v.btn}</Button> : null}
                                        <IconButton size="small" color="inherit" onClick={() => { this.handleCloseMsg(v) }}>
                                            <CloseIcon fontSize="small"/>
                                        </IconButton>
                                    </React.Fragment>
                                }
                            >
                                {v.type ? <Alert className="alert_msg" severity={v.type} variant="filled">{v.msg}</Alert> : null}
                            </Snackbar>)}
                        </div> : null}
                    </div>
                    {/* 子应用 */}
                    <main id="subview-container"></main>
                    {/* echarts resize */}
                    <iframe id="echarts_iframe"></iframe>
                </div>
            </div>
        );
    }
    componentDidMount(){
        // 延迟动画
        setTimeout(() => {
            this.initSub();
        }, 800);
        this.initSidebar();
    }

    componentWillUnMount(){
        this.setState({ loading: false });
    }
}