import React, { useEffect, useRef, useMemo, useState, Fragment, Children } from 'react';
import { Form, Input, DatePicker, Divider, Select, Button, Space, Descriptions } from 'antd';
import styles from '../style.less';
import ProTable from '@ant-design/pro-table';
import CustomerFormBox from './component/customerFormBox';
import NextStepButton from '../../components/nextstep-button';
import TitleStatus from '../../components/title-status';
import 'moment/locale/zh-cn';

import { genColumns } from './model/config';
import { successCode, usePreAnalyzeModel, useSearchModel } from './model';
import config from '@/config/index';
import Item from 'antd/lib/list/Item';
import { useNextStep } from '../../config';
import { useModel } from 'umi';
import { AreaChartOutlined } from '@ant-design/icons';
import Condition from '@/components/Condition';
import LineChart from './component/lineChart';
import { throttle } from '../utils/util';
import { getWaitResult } from '../step-select-sample/model/api';
import { getModelStepDetailApi } from '../../model/api';
import { exportExcel, queryVintageLoanTerms } from './model/api';
import moment from 'moment';

const FormItem = Form.Item;
const TextArea = Input.TextArea;
const { Option } = Select;

const { RangePicker }: any = DatePicker;

// 首页
const StepPreAnalyze: React.FC<any> = (props: any) => {
  // const { initialState, setInitialState } = useModel('@@initialState');
  const { pageType } = props;
  const formRef = useRef<any>({});
  const formRef2 = useRef<any>({});
  const [form] = Form.useForm();
  const tableRef = useRef<any>({});
  const rateRef = useRef<any>({});

  const [rateColumns, setRateColumns] = useState<any[]>([]);
  const [yearMonth, setYearMonth] = useState<any[]>([]);
  const [useTimeData, setUseTimeData] = useState<any>('');
  const [limitTimeData, setLimitTimeData] = useState<any>(['全部']);

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
    custCatList,
    indexList,

    setProductList,
    setChannelMidList,
    setChannelSmList,
    setCustCatList,

    getparams,
    getConditionList,
    getYaerMonthRequest,
    getProdChannelList,
    originChannelMidList,
    originChannelSmList,
    originCustCatList,
  } = useSearchModel();

  const { modelId } = useModel('step', (model: any) => ({
    modelId: model.modelId,
  }));
  const { nextStep } = useNextStep();

  //维度
  const changeDimension = (val: any) => {
    getparams({ businessType: val });

    setProductList([]);
    setChannelMidList([]);
    setChannelSmList([]);
    setCustCatList([]);

    formRef?.current?.setFieldsValue({
      prodCat: undefined,
      channelCatM: undefined,
      channelCatS: undefined,
      custCatL: undefined,
    });
  };

  //大类
  const changeProductClass = (arr: any) => {
    let val: any = arr;
    if (arr[arr.length - 1] == '全部') {
      val = ['全部'];
    } else {
      val = val.filter((item: any) => item != '全部');
    }

    console.log(val);
    let obj: any = {};
    if (val.length > 0) {
      let list: any[] = [];
      if (val?.includes('全部')) {
        list = originChannelMidList;
      } else {
        val?.map((ele: any) => {
          let temp: any = productList?.find((item: any) => item.name == ele);
          let tempChild: any[] = temp?.children ? temp?.children : [];
          list = [...list, ...tempChild];
        });
      }
      obj.prodCat = val;
      setChannelMidList(list);
      setChannelSmList([]);
      setCustCatList([]);
    } else {
      setChannelMidList([]);
      setChannelSmList([]);
      setCustCatList([]);
    }
    formRef?.current?.setFieldsValue({
      channelCatM: undefined,
      channelCatS: undefined,
      custCatL: undefined,
      ...obj,
    });
  };

  //中类
  const changeChannelMid = (arr: any) => {
    let val: any = arr;
    if (arr[arr.length - 1] == '全部') {
      val = ['全部'];
    } else {
      val = val.filter((item: any) => item != '全部');
    }
    let obj: any = {};
    if (val.length > 0) {
      let list: any[] = [];
      if (val?.includes('全部')) {
        list = originChannelSmList;
      } else {
        val.forEach((ele: any) => {
          let temp: any = channelMidList.find((item: any) => item.name == ele);
          list = [...list, ...temp?.children];
        });
      }
      obj.channelCatM = val;
      setChannelSmList(list);
      setCustCatList([]);
    } else {
      setChannelSmList([]);
      setCustCatList([]);
    }
    formRef?.current?.setFieldsValue({
      channelCatS: undefined,
      custCatL: undefined,
      ...obj,
    });
  };

  //小类
  const changeChannelS = (arr: any) => {
    let val: any = arr;
    if (arr[arr.length - 1] == '全部') {
      val = ['全部'];
    } else {
      val = val.filter((item: any) => item != '全部');
    }
    let obj: any = {};
    if (val.length > 0) {
      let list: any[] = [];
      if (val?.includes('全部')) {
        list = originCustCatList;
      } else {
        val.forEach((ele: any) => {
          let temp: any = channelSmList.find((item: any) => item.name == ele);
          list = [...list, ...temp?.children];
        });
      }
      obj.channelCatS = val;
      setCustCatList(list);
    } else {
      setCustCatList([]);
    }
    formRef?.current?.setFieldsValue({
      custCatL: undefined,
      ...obj,
    });
  };

  const changeCustCatL = (arr: any) => {
    let val: any = arr;
    if (arr[arr.length - 1] == '全部') {
      val = ['全部'];
    } else {
      val = val.filter((item: any) => item != '全部');
    }
    let obj: any = {};
    if (val.length > 0) {
      obj.custCatL = val;
    }
    formRef?.current?.setFieldsValue({
      ...obj,
    });
  };

  const _vcolumns = useMemo(
    () =>
      genColumns(vColumns, {
        productList,
        channelMidList,
        channelSmList,
        custCatList,
        indexList,
        changeProductClass,
        changeChannelMid,
        changeChannelS,
        changeCustCatL,
        changeDimension,
      }),
    [vColumns, productList, channelMidList, channelSmList, custCatList, indexList],
  );

  const onSelect = (val: any, type: string) => {
    if (type === 'paymentTime') {
      if (val !== '') {
        let temp = [...useTimeData];
        temp = temp.filter((item: any) => item !== '');
        temp.push(val);
        setUseTimeData(temp);
      } else if (val == '') {
        setUseTimeData('');
      }
    } else if (type === 'loadTerm') {
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
    if (type === 'paymentTime') {
      setUseTimeData(temp);
    } else if (type === 'loadTerm') {
      setLimitTimeData(temp);
    }
  };

  const getRateColumns = (extra: any[]) => {
    let _columns: any[] = [
      {
        title: '用款年月',
        dataIndex: 'paymentTime',
        hideInTable: true,
        renderFormItem: (t: any, r: any, i: any) => {
          return (
            <RangePicker
              allowClear
              style={{ maxWidth: '400px', minWidth: '120px' }}
              picker="month"
              placeholder={['开始时间', '结束时间']}
              format={'YYYY-MM'}
            />
          );
        },
      },
      {
        title: '贷款期限',
        dataIndex: 'loadTerm',
        hideInTable: true,
        renderFormItem: (t: any, r: any, i: any) => {
          return (
            <Select
              style={{ maxWidth: '400px', minWidth: '120px' }}
              onChange={(arr: any) => {
                let val: any = arr;
                if (arr?.length) {
                  if (val[val.length - 1] == '全部') {
                    val = ['全部'];
                  } else {
                    val = val.filter((item: any) => item != '全部');
                  }
                }
                // setLimitTimeData(val);
                formRef2?.current?.setFieldsValue({
                  loadTerm: val,
                });
              }}
              mode="multiple"
              allowClear
              maxTagCount={2}
              defaultValue={['全部']}
              // value={limitTimeData}
            >
              <Option key={'全部'} value={'全部'}>
                {'全部'}
              </Option>
              {yearMonth?.map?.((item: any) => {
                return (
                  <Option key={item} value={item}>
                    {item}
                  </Option>
                );
              })}
            </Select>
          );
        },
      },
      {
        title: '数据维度',
        dataIndex: 'dimention',
        fieldProps: {
          placeholder: '请选择数据维度',
          defaultValue: '进件层',
        },
        valueType: 'select',
        valueEnum: {
          进件层: '进件层',
          借据层: '借据层',
        },
        hideInTable: true,
      },
      {
        title: '汇总指标',
        dataIndex: 'index',
        fieldProps: {
          placeholder: '请选择汇总指标',
          defaultValue: '账户数',
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
    getYaerMonth();
    //回显默认
    getProdChannelList({ itmModelRegisCode: modelId }).then((res) => {
      if (res?.status?.code == successCode) {
        formRef?.current?.setFieldsValue({
          ...res?.result?.defaultSelection,
        });
      }
    });
    //回显
    getModelStepDetailApi({ stage: '4', itmModelRegisCode: modelId }).then((res) => {
      if (res.status.code == successCode) {
        let data = res?.result;
        // itmModelRegisCode: modelId,
        // customerDefinition: value,
        //   ...formData,
        formRef?.current?.setFieldsValue(data?.preanalysisCondition || {});
        formRef2?.current?.setFieldsValue(data?.preanalysisRollRateCondition || {});
        form?.setFieldsValue({
          vintageConclusion: data?.vintageConclusion,
          rollRateConclusion: data?.rollRateConclusion,
        });
        customerFormRef?.setFieldsValue(data?.customerDefinition || {});
      }
    });
  }, []);

  const getYaerMonth = async () => {
    let params = {};
    let res = await queryVintageLoanTerms(params);
    setYearMonth(res?.result);
  };

  const [customerFormRef] = Form.useForm();

  const getRateListArr = async (payLoad: any, filter: any) => {
    let res = await getRateList(payLoad);
    if (res?.status?.code === config.successCode) {
      let data: any[] =
        res?.result?.map?.((item: any) => ({ ...item, children: item?.monthList })) || [];
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
      columns = columns?.map?.((item: any) => {
        return {
          ...item,
          title: item?.label,
          dataIndex: item?.key,
          search: false,
          ellipsis: true,
          width: 120,
          filteredValue: item?.label === '本期状态' ? rateFilter : null,
          filters:
            item?.label === '本期状态'
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

      data = data?.filter?.((item) => filter?.includes(item?.name));

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

  const exportResult = async () => {
    customerFormRef.validateFields().then((value: any) => {
      if (value) {
        exportExcel({ itmModelRegisCode: modelId })
          .then((res) => {
            const blob: any = res;
            const reader = new FileReader(blob);
            reader.readAsDataURL(blob);
            reader.onload = (e: any) => {
              const a = document.createElement('a');
              a.download = `前期分析.${'xls'}`;
              a.href = e.target.result;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
            };
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  const onClick = () => {
    customerFormRef.validateFields().then((value: any) => {
      let formData = form.getFieldsValue();
      if (value) {
        let reqData = {
          itmModelRegisCode: modelId,
          customerDefinition: value,
          ...formData,
          preanalysisCondition: formRef?.current?.getFieldsValue(),
          preanalysisRollRateCondition: formRef2?.current?.getFieldsValue(),
        };
        console.log(reqData);
        nextFlow(reqData).then((res) => {
          if (res) {
            nextStep();
          }
        });
      }
    });
  };

  return (
    <div className={styles['step-page']}>
      {pageType !== 'viewReport' && (
        <div className={styles['step-title']}>
          <span>前期分析</span>
          <TitleStatus index={4} />
        </div>
      )}
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
          <LineChart base={base} tableType={tableType} columns={vChartColumns} data={vintageList} />
        </Condition>
      </div>
      {pageType !== 'viewReport' && (
        <Form form={form} layout="vertical">
          <FormItem name="vintageConclusion" label="VINTAGE分析结果" style={{ width: '100%' }}>
            <TextArea rows={4} placeholder="请输入VINTAGE分析结果" maxLength={150} />
          </FormItem>
        </Form>
      )}
      {pageType == 'viewReport' && (
        <Descriptions bordered column={2}>
          <Descriptions.Item label="VINTAGE分析结论">{}</Descriptions.Item>
        </Descriptions>
      )}
      <Divider />
      <p className={styles.commonTitle}>滚动率分析</p>
      <div className={styles.commonTable}>
        <ProTable
          actionRef={rateRef}
          formRef={formRef2}
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
            let reqData = {
              paymentTime: params?.paymentTime
                ?.map((item: any) => moment(item).format('YYYY-MM'))
                ?.join(),
              loadTerm: params?.loadTerm?.join(),
            };

            return getRateListArr({ page: params.current, ...params, ...reqData }, rateFilter);
          }}
          onChange={rateTableChange}
        />
      </div>
      {pageType !== 'viewReport' && (
        <Fragment>
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
        </Fragment>
      )}
      {pageType == 'viewReport' && (
        <Descriptions bordered column={2}>
          <Descriptions.Item label="滚动率分析结论">{}</Descriptions.Item>
        </Descriptions>
      )}
    </div>
  );
};

export default StepPreAnalyze;
