export const MODEL_TYPE = [
  { name: 'A', label: 'A' },
  { name: 'B', label: 'B' },
  { name: 'C', label: 'C' },
  { name: 'F', label: 'F' },
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

export const MODEL_STATUS = [
  { name: '0', label: '未完成' },
  { name: '1', label: '已完成' },
];

export const listToMap = (list: any[]) => {
  let obj: any = {};
  list.forEach((item: any, index: number) => {
    obj[item.name] = { text: item.label };
  });
  return obj;
};
