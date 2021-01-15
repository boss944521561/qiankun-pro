/**
 * @params {verify} 是否效验权限
 * @params {exact} 严格匹配
 * @author Mason<mason.meng@wehotelglobal.com>
 */

import './App.css';
import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Home from './pages/home';
import NotFound from './pages/404';
import NoAccess from './pages/403';
const Detail = lazy(() => import('./pages/detail'));

// 重定向
const redirect = (pathname, search) => {
  return (
    <Redirect to={{
      pathname,
      // search,
      // state: { referrer: currentLocation }
    }}/>
  );
};

const RouteExample = state => {
  const routeData = [
    {
      path: "/",
      exact: true,
      component: Home
    },
    {
      path: "/detail",
      exact: false,
      verify: true,
      component: Detail
    },
    {
      path: "/403",
      exact: true,
      component: NoAccess
    },
    {
      path: "/404",
      exact: true,
      component: NotFound
    },
  ];
  return (
    <Router basename={window.__POWERED_BY_QIANKUN__ ? '/pms/r' : '/'}>
      <Suspense fallback={null}>
        <Switch>
          {routeData.map((v, i) => <Route key={i} path={v.path} exact={v.exact} render={props => {
            if (state.auth === 'admin') return <v.component {...props}/>;
            return v.verify && state.auth.indexOf(`/pms/r${v.path}`) === -1 ? redirect('/403') : <v.component {...props}/> 
          }} />)}
          <Redirect to="/404"/>
        </Switch>
      </Suspense>
    </Router>
  );
};

export default function App(props) {
  // (开发环境) 单独启动子应用，拥有所有路由权限
  // (生产环境) 单独启动子应用，屏蔽全部verify路由权限
  // (开发环境) 整体启动，拥有权限配置通过的路由权限
  // (生产环境) 整体启动，拥有权限配置通过的路由权限
  let r = [];
  if (props.onGlobalStateChange) { // 整体启动
    props.onGlobalStateChange((value, prev) => {
      console.log(`%c[子应用${props.name}接收状态]`, 'color: red;font-weight:bold;', value, prev);
      r = value.routeData;
    }, true);
  } else { // 单独启动
    if (process.env.PMS_MODE === 'dev'){
      r = 'admin';
    }
  }
  return (
      <RouteExample auth={r}/>
  );
}
