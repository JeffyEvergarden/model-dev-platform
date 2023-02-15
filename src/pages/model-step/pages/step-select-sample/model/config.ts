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
    name: '分群建模便签',
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
