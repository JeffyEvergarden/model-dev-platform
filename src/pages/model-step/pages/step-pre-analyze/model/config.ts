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
  list.forEach((item: any, index: number) => {
    obj[item.name] = { text: item.label };
  });
  return obj;
};

export const genColumns = (extra: any[], config: any) => {
  const _columns: any[] = [
    {
      title: '产品大类',
      dataIndex: 'productClass',
      fieldProps: {
        placeholder: '请选择产品大类',
        onChange: (e: any) => {
          console.log('产品大类:----', e);
          config.changeProductClass(e);
        },
      },
      valueType: 'select',
      valueEnum: {
        ...listToMap(config.productList),
      },
      hideInTable: true,
    },
    {
      title: '渠道中类',
      dataIndex: 'channelMidClass',
      fieldProps: {
        placeholder: '请选择渠道中类',
        onChange: (e: any) => {
          console.log('渠道中类:----', e);
          config.changeChannelMid(e);
        },
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
      dataIndex: 'channelSmClass',
      fieldProps: {
        placeholder: '请选择渠道小类',
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
      dataIndex: 'customerClass',
      valueEnum: {
        ...listToMap(BUSSINESS_CODE),
      },
      hideInTable: true,
    },
    {
      title: '数据纬度',
      dataIndex: 'dataClass',
      valueEnum: {
        ...listToMap(BUSSINESS_CODE),
      },
      hideInTable: true,
    },
    {
      title: '汇总指标',
      dataIndex: 'overviewMetics',
      valueEnum: {
        ...listToMap(BUSSINESS_CODE),
      },
      hideInTable: true,
    },
    {
      title: '期数',
      dataIndex: 'periodName',
      search: false,
      width: '120px',
    },
  ];

  return [..._columns, ...extra];
};
