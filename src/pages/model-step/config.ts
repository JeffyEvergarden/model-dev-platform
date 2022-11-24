export const config: any = {
  model_overview: '/modelStep/overview', // 模型概况  -------
  select_sample: '/modelStep/selectSample', // 样本选取 ------
  strategy_back: '/modelStep/strategyBack', // 策略回溯 ------
  pre_analyze: '/modelStep/preAnalyze', // 前期分析 -------
  define_sample: '/modelStep/defineSample', // 样本定义 ------
  feature_prepare: '/modelStep/featurePrepare', // 特征准备 ------
  feature_build: '/modelStep/featureBuild', // 特征工程 -------
  model_build: '/modelStep/modelBuild', // 模型构建 -------
  model_compare: '/modelStep/modelCompare', // 模型对比 -------
  export_report: '/modelStep/exportReport', // 生成报告 -------
};

// 步骤
export const STEP_ITEM_LIST: any[] = [
  {
    title: '模型概况',
    name: 'model_overview',
  },
  {
    title: '样本选取',
    name: 'select_sample',
  },
  {
    title: '策略回溯',
    name: 'strategy_back',
  },
  {
    title: '前期分析',
    name: 'pre_analyze',
  },
  {
    title: '样本定义',
    name: 'define_sample',
  },
  {
    title: '特征准备',
    name: 'feature_prepare',
  },
  {
    title: '特征工程',
    name: 'feature_build',
  },
  {
    title: '模型构建',
    name: 'model_build',
  },
  {
    title: '模型对比',
    name: 'model_compare',
  },
  {
    title: '生成报告',
    name: 'export_report',
  },
];

export const STEP_NAME_MAP: any = {
  model_overview: 0, // 模型概况
  select_sample: 1, // 样本选取
  strategy_back: 2, // 策略回溯
  pre_analyze: 3, // 前期分析
  define_sample: 4, // 定义样本
  feature_prepare: 5, //  特征准备
  feature_build: 6, // 特征工程
  model_build: 7, // 模型构建
  model_compare: 8, // 模型对比
  export_report: 9, // 生成报告
};
