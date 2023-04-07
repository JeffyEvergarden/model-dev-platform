export default [
  {
    path: '/',
    component: './home',
    name: '首页',
    layout: true,
    hideInMenu: true,
  },
  // {
  //   path: '/login',
  //   layout: false,
  //   hideInMenu: true,
  //   name: '登录',
  //   component: './user/Login',
  //   noAuth: true,
  // },
  {
    path: '/workBench',
    layout: true,
    name: '我的工作台',
    component: './work-bench/home',
    routes: [
      {
        path: '/workBench/my-job',
        component: './work-bench/my-job',
      },
      {
        path: '/workBench/viewReport',
        component: './work-bench/viewReport',
      },
      { redirect: '/workBench/my-job' },
    ],
  },
  {
    path: '/modelStep',
    layout: true,
    hideInMenu: true,
    name: '模型详情',
    component: './model-step',
    routes: [
      {
        path: '/modelStep/overview',
        component: './model-step/pages/step-model-overview', // 模型概况
      },
      {
        path: '/modelStep/selectSample',
        component: './model-step/pages/step-select-sample', // 样本选取
      },
      {
        path: '/modelStep/strategyBack',
        component: './model-step/pages/step-strategy-back', // 策略回溯
      },
      {
        path: '/modelStep/defineSample',
        component: './model-step/pages/step-define-sample', // 样本定义
      },
      {
        path: '/modelStep/preAnalyze',
        component: './model-step/pages/step-pre-analyze', // 前期分析
      },
      {
        path: '/modelStep/featurePrepare',
        component: './model-step/pages/step-feature-prepare', // 特征准备
      },
      {
        path: '/modelStep/featureBuild',
        component: './model-step/pages/step-feature-build', // 特征工程
      },
      {
        path: '/modelStep/modelBuild',
        component: './model-step/pages/step-model-build', // 模型构建
      },
      {
        path: '/modelStep/modelCompare',
        component: './model-step/pages/step-model-compare', // 模型对比
      },
      {
        path: '/modelStep/exportReport',
        component: './model-step/pages/step-export-report', // 生成报告
      },
      {
        path: '/modelStep/loadingPage',
        component: './model-step/pages/loadingPage.tsx', // 生成报告
      },
      { redirect: '/modelStep/loadingPage' },
    ],
  },
  { path: '/403', component: './403', layout: true, hideInMenu: true },
  { component: './404', layout: true, hideInMenu: true },
];
