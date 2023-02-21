import React, { useEffect, useRef, useMemo, useState, Fragment, Children } from 'react';
import { Form, Input, DatePicker, Divider, Select, Button, Space } from 'antd';
import styles from '../style.less';
import ProTable from '@ant-design/pro-table';
import CustomerFormBox from './component/customerFormBox';
import NextStepButton from '../../components/nextstep-button';
import TitleStatus from '../../components/title-status';
import 'moment/locale/zh-cn';

import { genColumns } from './model/config';
import { usePreAnalyzeModel, useSearchModel } from './model';
import config from '@/config/index';
import Item from 'antd/lib/list/Item';
import { useNextStep } from '../../config';
import { useModel } from 'umi';
import { AreaChartOutlined } from '@ant-design/icons';
import Condition from '@/components/Condition';
import LineChart from './component/lineChart';
import { throttle } from '../utils/util';

const FormItem = Form.Item;
const TextArea = Input.TextArea;
const { Option } = Select;

const { RangePicker }: any = DatePicker;

// 首页
const StepPreAnalyze: React.FC<any> = (props: any) => {
  // const { initialState, setInitialState } = useModel('@@initialState');
  const formRef = useRef<any>({});
  const [form] = Form.useForm();
  const tableRef = useRef<any>({});
  const rateRef = useRef<any>({});

  const [rateColumns, setRateColumns] = useState<any[]>([]);
  const [yearMonth, setYearMonth] = useState<any[]>([]);
  const [useTimeData, setUseTimeData] = useState<any>('');
  const [limitTimeData, setLimitTimeData] = useState<any>('');

  const [rateFilter, setRateFilter] = useState<any[]>(['M0', 'M1', 'M2']);
  const [tableType, setTableType] = useState<any>(true);

  const rate = document.body.clientWidth / 1920;
  const [base, setBase] = useState<number>(rate);

  const resize = () => {
    const html = document.documentElement;
    const realRate = document.body.clientWidth / 1920;
    const rate = realRate <= 0.75 ? 0.75 : realRate;
    // console.log('resize', rate);
    html.style.fontSize = rate * 20 + 'px';
    setBase(rate);
  };

  useEffect(() => {
    resize();
    const fn = throttle(() => {
      resize();
    }, 200);
    window.addEventListener('resize', fn);
    return () => {
      window.removeEventListener('resize', fn);
    };
  }, []);

  // vintage 分析
  const {
    vloading,
    vintageList,
    vintageTotal,
    getVintageList,
    vColumns,
    vChartColumns,
    // -------
    sloading,
    scrollList,
    scrollTotal,
    getScrollList,
    sColumns,

    getRateList,
    nextFlow,
  } = usePreAnalyzeModel();

  const {
    productList,
    channelMidList,
    channelSmList,
    setChannelMidList,
    setChannelSmList,
    getConditionList,
    getYaerMonthRequest,
    originChannelMidList,
    originChannelSmList,
  } = useSearchModel();

  const { modelId } = useModel('step', (model: any) => ({
    modelId: model.modelId,
  }));
  const { nextStep } = useNextStep();

  const changeProductClass = (val: any) => {
    if (val) {
      let item: any = productList.find((item) => item.name === val);
      let list: any[] = item.children || [];
      let subList: any[] = [];
      list.forEach((subitem) => {
        if (subitem.children) {
          subList.push(...subitem.children);
        }
      });
      setChannelMidList(list);
      setChannelSmList(subList);
    } else {
      // 参数置空
      setChannelMidList(originChannelMidList);
      setChannelSmList(originChannelSmList);
    }
    (formRef.current as any).setFieldsValue({
      channelMidClass: undefined,
      channelSmClass: undefined,
    });
  };

  const changeChannelMid = (val: any) => {
    const formVal: any = (formRef.current as any).getFieldsValue();
    const _val = formVal?.productClass;
    if (val) {
      let item: any = channelMidList.find((item) => item.name === val);
      let list: any[] = item.children || [];
      setChannelSmList(list);
    } else {
      if (_val) {
        // 如果一级筛选有值
        let item: any = productList.find((item) => item.name === _val);
        let list: any[] = item?.children || [];
        let subList: any[] = [];
        list.forEach((subitem) => {
          if (subitem.children) {
            subList.push(...subitem.children);
          }
        });
        setChannelSmList(subList);
      } else {
        setChannelSmList(originChannelSmList);
      }
    }
    (formRef.current as any).setFieldsValue({
      channelSmClass: undefined,
    });
  };

  const _vcolumns = useMemo(
    () =>
      genColumns(vColumns, {
        productList,
        channelMidList,
        channelSmList,
        changeProductClass,
        changeChannelMid,
      }),
    [vColumns, productList, channelMidList, channelSmList],
  );

  const onSelect = (val: any, type: string) => {
    if (type === 'useTime') {
      if (val !== '') {
        let temp = [...useTimeData];
        temp = temp.filter((item: any) => item !== '');
        temp.push(val);
        setUseTimeData(temp);
      } else if (val == '') {
        setUseTimeData('');
      }
    } else if (type === 'limitTime') {
      if (val !== '') {
        let temp = [...limitTimeData];
        temp = temp.filter((item: any) => item !== '');
        temp.push(val);
        setLimitTimeData(temp);
      } else if (val == '') {
        setLimitTimeData('');
      }
    }
  };

  const onDeselect = (val: any, type: string) => {
    let temp = [...useTimeData];
    temp = temp.filter((item: any) => item !== val);
    if (type === 'useTime') {
      setUseTimeData(temp);
    } else if (type === 'limitTime') {
      setLimitTimeData(temp);
    }
  };

  const getRateColumns = (extra: any[]) => {
    let _columns: any[] = [
      {
        title: '用款年月',
        dataIndex: 'useTime',
        hideInTable: true,
        renderFormItem: (t: any, r: any, i: any) => {
          return (
            <RangePicker
              allowClear
              style={{ maxWidth: '400px', minWidth: '120px' }}
              picker="month"
              placeholder={['开始时间', '结束时间']}
            />
          );
        },
      },
      {
        title: '贷款期限',
        dataIndex: 'limitTime',
        hideInTable: true,
        renderFormItem: (t: any, r: any, i: any) => {
          return (
            <Select
              style={{ maxWidth: '400px', minWidth: '120px' }}
              onSelect={(val) => onSelect(val, 'limitTime')}
              onDeselect={(val) => onDeselect(val, 'limitTime')}
              mode="multiple"
              allowClear
              maxTagCount={2}
              value={limitTimeData}
            >
              <Option key={''} value="">
                全选
              </Option>
              {yearMonth.map((item: any) => {
                return (
                  <Option key={item.value} value={item.value}>
                    {item.value}
                  </Option>
                );
              })}
            </Select>
          );
        },
      },
      {
        title: '数据维度',
        dataIndex: 'dataDimension',
        fieldProps: {
          placeholder: '请选择数据维度',
        },
        valueType: 'select',
        valueEnum: {
          账户层: '账户层',
          借据层: '借据层',
        },
        hideInTable: true,
      },
      {
        title: '汇总指标',
        dataIndex: 'summary',
        fieldProps: {
          placeholder: '请选择数据维度',
        },
        valueType: 'select',
        valueEnum: {
          账户数: '账户数',
          金额: '金额',
        },
        hideInTable: true,
      },
    ];
    return [..._columns, ...extra];
  };

  const _rateColumns = useMemo(
    () => getRateColumns(rateColumns),
    [rateColumns, yearMonth, useTimeData, limitTimeData],
  );

  useEffect(() => {
    getConditionList();
    // console.log(formRef);
    getYaerMonth();
  }, []);

  const getYaerMonth = async () => {
    let params = {};
    let res = await getYaerMonthRequest(params);
    setYearMonth(res?.data);
  };

  const [customerFormRef] = Form.useForm();

  const getRateListArr = async (payLoad: any, filter: any) => {
    let res = await getRateList(payLoad);
    if (res?.status?.code === config.successCode) {
      let data: any[] =
        res?.result?.map((item: any) => ({ ...item, children: item?.monthList })) || [];
      let columns: any[] = [
        {
          key: 'name',
          label: '本期状态',
        },
        {
          key: 'M0',
          label: 'M0',
        },
        {
          key: 'M1',
          label: 'M1',
        },
        {
          key: 'M2',
          label: 'M2',
        },
      ];
      columns = columns.map((item: any) => {
        return {
          ...item,
          title: item.label,
          dataIndex: item.key,
          search: false,
          ellipsis: true,
          width: 120,
          filteredValue: item.label === '本期状态' ? rateFilter : null,
          filters:
            item.label === '本期状态'
              ? // data?.map(item => ({ text: item?.name, value: item?.name }))
                [
                  {
                    text: 'M0',
                    value: 'M0',
                  },
                  {
                    text: 'M1',
                    value: 'M1',
                  },
                  {
                    text: 'M2',
                    value: 'M2',
                  },
                ]
              : null,
        };
      });

      data = data?.filter((item) => filter?.includes(item?.name));

      let total = data?.length || 0;

      setRateColumns(columns);
      return {
        data,
        total,
      };
    } else {
      return {
        data: [],
        total: 0,
      };
    }
  };

  const rateTableChange = (a: any, filter: any, c: any) => {
    console.log(a, filter, c);
    setRateFilter(filter?.name || []);
  };

  const exportResult = () => {
    customerFormRef.validateFields().then((value: any) => {
      console.log('value', value);
    });
  };

  const onClick = () => {
    customerFormRef.validateFields().then((value: any) => {
      console.log('value', value);
      if (value) {
        nextFlow({ itmModelRegisCode: modelId }).then((res) => {
          if (res) {
            nextStep();
          }
        });
      }
    });
  };

  return (
    <div className={styles['step-page']}>
      <div className={styles['step-title']}>
        <span>前期分析</span>
        <TitleStatus index={4}></TitleStatus>
      </div>
      <p className={styles.commonTitle}>VINTAGE分析</p>
      <div className={styles.commonTable}>
        <ProTable<any>
          // params={searchForm}
          columns={_vcolumns}
          actionRef={tableRef}
          loading={vloading}
          // scroll={{}}
          request={async (params = {}, sort, filter) => {
            return getVintageList({ page: params.current, ...params });
          }}
          editable={{
            type: 'multiple',
          }}
          columnsState={{
            persistenceKey: 'pro-table-pre-analyze-list',
            persistenceType: 'localStorage',
          }}
          rowKey={(r) => r.key}
          search={{
            labelWidth: 'auto',
            // optionRender: false,
            // collapsed: false,
          }}
          formRef={formRef}
          form={{
            // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
            // 查询参数转化
            syncToUrl: (values, type) => {
              console.log(values, type);
              if (type === 'get') {
                return {
                  ...values,
                };
              }
              return values;
            },
          }}
          pagination={false}
          dateFormatter="string"
          headerTitle="VINTAGE分析结果"
          toolBarRender={() => []}
          toolbar={{
            actions: [
              <AreaChartOutlined
                onClick={() => {
                  setTableType(!tableType);
                }}
                style={{ color: tableType ? 'gray' : '#40a9ff', border: '1px solid', padding: 4 }}
              />,
            ],
          }}
          options={false}
          tableStyle={{ display: tableType ? 'block' : 'none' }}
        />
        <Condition r-show={!tableType}>
          <LineChart
            base={base}
            tableType={tableType}
            columns={vChartColumns}
            data={vintageList}
          ></LineChart>
        </Condition>
      </div>
      <Form form={form} layout="vertical">
        <FormItem name="vintageConclusion" label="VINTAGE分析结果" style={{ width: '100%' }}>
          <TextArea rows={4} placeholder="请输入VINTAGE分析结果" maxLength={150} />
        </FormItem>
      </Form>
      <Divider />
      <p className={styles.commonTitle}>滚动率分析</p>
      <div className={styles.commonTable}>
        <ProTable
          actionRef={rateRef}
          headerTitle="滚动率分析结果"
          rowKey={(r) => r.key}
          toolBarRender={() => []}
          options={{ density: false, fullScreen: false, reload: false, setting: true }}
          search={{
            labelWidth: 'auto',
            // optionRender: false,
            // collapsed: false,
          }}
          pagination={false}
          columns={_rateColumns}
          request={async (params = {}, sort, filter) => {
            return getRateListArr({ page: params.current, ...params }, rateFilter);
          }}
          onChange={rateTableChange}
        />
      </div>
      <Form form={form} layout="vertical">
        <FormItem name="rollRateConclusion" label="滚动率分析结论" style={{ width: '100%' }}>
          <TextArea rows={4} placeholder="请输入滚动率分析结论" maxLength={150} />
        </FormItem>
      </Form>
      <Divider />
      <p className={styles.commonTitle}>经分析，将好坏客户定义设置为：</p>
      <CustomerFormBox customerFormRef={customerFormRef} />
      <NextStepButton
        btnNode={
          <Space>
            <Button onClick={exportResult} size="large">
              导出结果
            </Button>
            <Button onClick={onClick} size="large" type="primary">
              下一流程
            </Button>
          </Space>
        }
      />
    </div>
  );
};

export default StepPreAnalyze;
