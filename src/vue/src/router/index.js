/**
 * @params {verify} 是否效验权限
 * @params {exact} 严格匹配
 * @author Mason<mason.meng@wehotelglobal.com>
 */

const routes = props => {
  const routeData = [
    { 
      path: '/', 
      name: 'home', 
      component: () => { return import('@/views/Home') }
    },
    { 
      path: '/list', 
      name: 'list', 
      verify: true,
      component: () => { return import('@/views/Home') }
    },
    { 
      path: '/about', 
      name: 'about', 
      verify: true,
      component: () => { return import('@/views/About') }
    },
    { 
      path: '/403', 
      name: '403', 
      component: () => { return import('@/views/403') }
    },
    {
      path: "/404",
      name: '404',
      component: () => { return import('@/views/404') }
    },
    { 
      path: '/:pathMatch(.*)*', 
      redirect: '/404'
    }
  ];
  
  // 效验权限
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
  routeData.forEach(v => {
    if (r === 'admin') return;
    if (v.verify && r.indexOf(`/pms/v${v.path}`) === -1) {
      v.redirect = '/403';
      delete v.component;
      return;
    }
  });
  
  return routeData;
};

export default routes;
