/**
 * @title 侧栏配置
 * @desc 1. 仅支持至2级菜单栏 （多了太丑...，如果需要3级或更多请自行改动吧）
 * @desc 2. 权限配置auth:：需有1级，才可展示2级。 例如：想展示 1-2，请带上 1。
 * @author Mason<mason.meng@wehotelglobal.com>
 */

import React from 'react';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
const auth = ['1', '1-1', '1-2', '2', '3', '3-1', '3-2', '4', '4-1', '4-2', '5', '5-1', '5-2', '6', '88', '99'];

// 侧栏配置
const res =  {
    PMS: {
        link: '/pms/r',
        data: [
            {
                id: '1',
                name: '数据总览',
                icon: <SendIcon className="tabsList_listItemIcon"/>,
                children: [
                    {
                        id: '1-1',
                        name: '数据详情',
                        icon: <DraftsIcon className="tabsList_listItemIcon"/>,
                        link: '/pms/r/detail'
                    },
                    {
                        id: '1-2',
                        name: '数据关联',
                        icon: <DraftsIcon className="tabsList_listItemIcon"/>,
                        link: '/pms/r/about'
                    }
                ]
            },
            {
                id: '2',
                name: '异常处理',
                icon: <InboxIcon className="tabsList_listItemIcon"/>,
                link: '/pms/r/123',
            },
            {
                id: '3',
                name: '报警监控',
                icon: <DraftsIcon className="tabsList_listItemIcon"/>,
                children: [
                    {
                        id: '3-1',
                        name: '栏目3-1',
                        icon: <InboxIcon className="tabsList_listItemIcon"/>,
                        link: '/pms/r/456'
                    },
                    {
                        id: '3-2',
                        name: '栏目3-2',
                        icon: <DraftsIcon className="tabsList_listItemIcon"/>,
                        link: '/pms/r/789'
                    }
                ]
            },
            {
                id: '88',
                name: '报警监控1',
                icon: <DraftsIcon className="tabsList_listItemIcon"/>,
                children: [
                    {
                        id: '3-1',
                        name: '栏目3-1',
                        icon: <InboxIcon className="tabsList_listItemIcon"/>,
                        link: '/pms/r/12'
                    },
                    {
                        id: '3-2',
                        name: '栏目3-2',
                        icon: <DraftsIcon className="tabsList_listItemIcon"/>,
                        link: '/pms/r/list'
                    }
                ]
            },
            {
                id: '99',
                name: '报警监控2',
                icon: <DraftsIcon className="tabsList_listItemIcon"/>,
                children: [
                    {
                        id: '3-1',
                        name: '栏目3-1',
                        icon: <InboxIcon className="tabsList_listItemIcon"/>,
                        link: '/pms/r/about1'
                    },
                    {
                        id: '3-2',
                        name: '栏目3-2',
                        icon: <DraftsIcon className="tabsList_listItemIcon"/>,
                        link: '/pms/r/list23'
                    }
                ]
            },
        ]
    },
    ASS: {
        link: '/pms/v',
        data: [
            {
                id: '4',
                name: '栏目35555',
                icon: <DraftsIcon className="tabsList_listItemIcon"/>,
                children: [
                    {
                        id: '4-1',
                        name: '栏目4-1',
                        icon: <InboxIcon className="tabsList_listItemIcon"/>,
                        link: '/pms/v/list'
                    },
                    {
                        id: '4-2',
                        name: '栏目4-2',
                        icon: <DraftsIcon className="tabsList_listItemIcon"/>,
                        link: '/pms/v/about'
                    }
                ]
            },
            {
                id: '5',
                name: '栏目1111',
                icon: <InboxIcon className="tabsList_listItemIcon"/>,
                children: [
                    {
                        id: '5-1',
                        name: '栏目1-55555555',
                        icon: <InboxIcon className="tabsList_listItemIcon"/>,
                        link: '/pms/v/aboutdsa'
                    },
                    {
                        id: '5-2',
                        name: '栏目5-2',
                        icon: <DraftsIcon className="tabsList_listItemIcon"/>,
                        link: '/pms/v/about2'
                    }
                ]
            },
            {
                id: '6',
                name: '栏目22334442',
                icon: <SendIcon className="tabsList_listItemIcon"/>,
                link: '/pms/v/'
            },
        ]
    }
};

// 递归出有权限的侧栏配置
const result = {}; // 侧栏配置
export const routeData = []; // 侧栏路由
const listKeys = Object.keys(res);
const handleResult = l => {
    const r = [];
    l.map(v => {
        if (auth.indexOf(v.id) !== -1) {
            r.push(v);
            if (v.link) {
                if (routeData.indexOf(v.link) === -1) {
                    routeData.push(v.link);
                }
            }
            if (v.children && v.children.length) {
                v.children = handleResult(v.children);
            }
        }
    })
    return r;
};

listKeys.map(v => {
    result[v] = {};
    result[v].link = res[v].link;
    result[v].data = handleResult(res[v].data);
});

export default result;
// export default res;