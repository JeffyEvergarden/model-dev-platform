export const MODEL_TYPE = [
  { name: 'A', label: 'A卡' },
  { name: 'B', label: 'B卡' },
  { name: 'C', label: 'C卡' },
  { name: 'F', label: 'F卡' },
  { name: '其他', label: '其他' },
];

export const MODEL_STAGE = [
  { name: '1', label: '模型概况' },
  { name: '2', label: '样本选取' },
  { name: '3', label: '策略回溯' },
  { name: '4', label: '前期分析' },
  { name: '5', label: '样本定义' },
  { name: '6', label: '特征准备' },
  { name: '7', label: '特征工程' },
  { name: '8', label: '模型构建' },
  { name: '9', label: '模型对比' },
  { name: '10', label: '生成报告' },
];

export const STAGESTATUS_MAP = {
  '0': '未开始',
  '1': '进行中',
  '2': '已完成',
  '3': '处理失败',
};

export const STAGESTATUS_COLOR_MAP = {
  '0': 'default',
  '1': 'warning',
  '2': 'success',
  '3': 'error',
};

export const MODEL_STATUS = [
  { name: '0', label: '未完成', status: 'Error' },
  { name: '1', label: '已完成', status: 'Success' },
];

export const listToMap = (list: any[]) => {
  let obj: any = {};
  list.forEach((item: any, index: number) => {
    obj[item.name] = { text: item.label, status: item?.status || undefined };
  });
  return obj;
};
