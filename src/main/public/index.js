import './index.less';
import cookie from '~/cookie.js';
import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Home from '../src/pages/home';
import Issues from '../src/pages/issues';
import Login from '../src/pages/login';
import NotFound from '../src/pages/404';
const Tabs = lazy(() => import('../src/pages/tabs'));

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

// 注册主应用
const Main = () => {
  const routeData = [
    {
      path: "/",
      exact: true,
      component: Home
    },
    {
  
      path: "/issues",
      exact: true,
      component: Issues
    },
    {
      path: "/pms/*",
      exact: true,
      component: Tabs
    },
    {
      path: "/login",
      exact: true,
      component: Login
    },
    {
      path: "/404",
      exact: true,
      component: NotFound
    },
  ];
  return (
    <Router basename='/'>
      <Suspense fallback={null}>
        <Switch>
          {routeData.map((v, i) => <Route key={i} path={v.path} exact={v.exact} render={props => {
            const token = cookie.get('t');
            if (v.path === "/login") {
              return !token ? <v.component {...props}/> : redirect('/pms/r');
            }
            return token ? <v.component {...props}/> : redirect('/login');
          }
          } />)}
          <Redirect to="/404"/>
        </Switch>
      </Suspense>
    </Router>
  );
};
ReactDOM.render(<Main />, document.getElementById('main'));
