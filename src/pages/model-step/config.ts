import { history } from 'umi';

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

export enum STEP_NAME_MAP {
  model_overview = 1, // 模型概况
  select_sample = 2, // 样本选取
  strategy_back = 3, // 策略回溯
  pre_analyze = 4, // 前期分析
  define_sample = 5, // 定义样本
  feature_prepare = 6, //  特征准备
  feature_build = 7, // 特征工程
  model_build = 8, // 模型构建
  model_compare = 9, // 模型对比
  export_report = 10, // 生成报告
}

export enum STEP_STATUS {
  wait = 0,
  process = 1,
  finish = 2,
  error = 3,
}

// 前端步骤名称 到 后端编码
export const nameToCode = (name: string) => {
  return STEP_NAME_MAP[name] || null;
};

// 后端编码 到 前端步骤名称
export const codeToName = (index: number) => {
  return STEP_NAME_MAP[index] || null;
};

// 前后端状态映射
export const formateStatus = (val: any) => {
  return STEP_STATUS[val];
};

export const goToUrl = (name: any, id: any) => {
  history.replace(config[name] + `?id=${id}`);
};
