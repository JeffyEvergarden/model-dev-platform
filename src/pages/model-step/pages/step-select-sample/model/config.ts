const TYPE = {
  '0': '否',
  '1': '是',
};

export const tabSelectColumns: any[] = [
  {
    name: '导入数据',
    key: 'importType',
    formate: (val: any) => {
      return TYPE[val];
    },
  },
  {
    name: '选择日期',
    key: 'rangeDate',
  },
  {
    name: '数据维度',
    key: 'businessType',
  },
  {
    name: '产品大类',
    key: 'businessType',
  },
  {
    name: '渠道中类',
    key: 'channelCatM',
  },
  {
    name: '渠道小类',
    key: 'channelCatS',
  },
  {
    name: '编排维度',
    key: 'processName',
  },
  {
    name: '分群建模标签',
    key: 'featureLabel',
  },
];

export const tabSelectColumnsTwo: any[] = [
  {
    name: '导入数据',
    key: 'importType',
    formate: (val: any) => {
      return TYPE[val];
    },
  },
  {
    name: '数据维度',
    key: 'businessType',
  },
  {
    name: '表名称',
    key: 'tableName',
  },
  {
    name: '表字段',
    key: 'dimensionField',
  },
  {
    name: '创建时间',
    key: 'create',
    formate: () => {
      return '-';
    },
  },
];

//详细内容参考链接-https://is35svcbne.feishu.cn/sheets/shtcn4abretoam7r1kApU5ytbLf?sheet=5265mf

//带搜索的可输入下拉单选- 字符串(string)、列表(list)
export const selectList: any[] = ['equal', 'notEqual', 'contains', 'notContains'];

//字符输入框-字符串(string)
export const inputList: any[] = ['regMatch', 'regNotMatch'];

//数字输入框-数值（number)
export const inputNumberList: any[] = [
  'equal',
  'notEqual',
  'lessOrEqual',
  'lessThan',
  'greaterOrEqual',
  'greaterThan',

  'nullOrLessThan',
  'nullOrLessThanOrEqual',
];

//数字范围输入框 --做成两个数字输入框--数值（number)
export const inputNumberRangerList: any[] = [
  'betweenAnd',
  'openBetweenAnd',
  'IOpenBetweenAnd',
  'rOpenBetweenAnd',
];

//日期时间选择框-时间(datetime)、
export const DatePickerList: any[] = [
  'equal',
  'notEqual',
  'lessOrEqual',
  'lessThan',
  'greaterOrEqual',
  'greaterThan',

  'nullOrLessThan',
  'nullOrLessThanOrEqual',
];

//时间范围选择框-时间(datetime)
export const RangePickerList: any[] = [
  'betweenAnd',
  'openBetweenAnd',
  'IOpenBetweenAnd',
  'rOpenBetweenAnd',
];
