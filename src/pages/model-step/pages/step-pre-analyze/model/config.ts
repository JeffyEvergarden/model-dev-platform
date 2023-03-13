export const BUSSINESS_CODE = [
  { name: '营销', label: '营销' },
  { name: '客服', label: '客服' },
  { name: '风险', label: '风险' },
  { name: '催收', label: '催收' },
  { name: '审批', label: '审批' },
  { name: '渠道', label: '渠道' },
];

export const listToMap = (list: any[]) => {
  let obj: any = {};
  list?.forEach((item: any, index: number) => {
    if (item.label) {
      obj[item.name] = { text: item.label };
    }
  });
  return obj;
};

export const genColumns = (extra: any[], config: any) => {
  console.log(config);

  const _columns: any[] = [
    {
      title: '数据维度',
      dataIndex: 'dimension',
      valueEnum: {
        SX: '进件层',
      },
      fieldProps: {
        placeholder: '请选择数据维度',
        onChange: (e: any) => {
          console.log('数据维度:----', e);
          config.changeDimension(e);
        },
      },
      hideInTable: true,
    },
    {
      title: '产品大类',
      dataIndex: 'prodCat',
      fieldProps: {
        placeholder: '请选择产品大类',
        onChange: (e: any) => {
          console.log('产品大类:----', e);
          config.changeProductClass(e);
        },
        mode: 'multiple',
      },
      valueType: 'select',
      valueEnum: {
        ...listToMap(config.productList),
      },
      hideInTable: true,
    },
    {
      title: '渠道中类',
      dataIndex: 'channelCatM',
      fieldProps: {
        placeholder: '请选择渠道中类',
        onChange: (e: any) => {
          console.log('渠道中类:----', e);
          config.changeChannelMid(e);
        },
        mode: 'multiple',
      },
      valueType: 'select',
      initialValue: undefined,
      valueEnum: {
        ...listToMap(config.channelMidList),
      },
      hideInTable: true,
    },
    {
      title: '渠道小类',
      dataIndex: 'channelCatS',
      fieldProps: {
        placeholder: '请选择渠道小类',
        mode: 'multiple',
        onChange: (e: any) => {
          console.log('渠道中类:----', e);
          config.changeChannelS(e);
        },
      },
      valueType: 'select',
      initialValue: undefined,
      valueEnum: {
        ...listToMap(config.channelSmList),
      },
      hideInTable: true,
    },
    {
      title: '客群大类',
      fieldProps: {
        placeholder: '请选择客群大类',
        mode: 'multiple',
        onChange: (e: any) => {
          console.log('渠道中类:----', e);
          config.changeCustCatL(e);
        },
      },
      dataIndex: 'custCatL',
      valueEnum: {
        ...listToMap(config.custCatList),
      },
      hideInTable: true,
    },
    {
      title: '汇总指标',
      dataIndex: 'indexList',
      fieldProps: {
        placeholder: '请选择汇总指标',
      },
      valueEnum: {
        ...listToMap(config.indexList),
      },
      formItemProps: {
        rules: [{ required: true, message: '请选择汇总指标' }],
        initialValue: 'M2+余额占比',
      },
      hideInTable: true,
    },
  ];

  return [..._columns, ...extra];
};

export const operatorOption = [
  { label: '=', value: '=' },
  { label: '≠', value: '!=' },
  { label: '>=', value: '>=' },
  { label: '>', value: '>' },
  { label: '<=', value: '<=' },
  { label: '<', value: '<' },
];
