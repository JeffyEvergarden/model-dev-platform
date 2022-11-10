export default [
  {
    path: '/',
    component: './home',
    name: '首页',
    layout: true,
    hideInMenu: true,
  },
  {
    path: '/login',
    layout: false,
    hideInMenu: true,
    name: '登录',
    component: './user/Login',
    noAuth: true,
  },
  {
    path: '/myjob',
    layout: true,
    name: '我的工作台',
    component: './my-job',
  },
  { path: '/403', component: './403', layout: true, hideInMenu: true },
  { component: './404', layout: true, hideInMenu: true },
];
