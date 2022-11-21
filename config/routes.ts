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
  {
    path: '/datasource/management',
    layout: true,
    name: '数据源管理',
    component: './datasource-manage/layout',
  },
  {
    path: '/modelStep',
    layout: true,
    name: '模型详情',
    component: './model-step',
    routes: [
      {
        path: '/modelStep/overview',
        component: './model-step/pages/step-one', // 模型概况
      },
      {
        path: '/modelStep/selectSample',
        component: './model-step/pages/step-two', // 样本选取
      },
      { redirect: '/modelStep/overview' },
    ],
  },
  { path: '/403', component: './403', layout: true, hideInMenu: true },
  { component: './404', layout: true, hideInMenu: true },
];
