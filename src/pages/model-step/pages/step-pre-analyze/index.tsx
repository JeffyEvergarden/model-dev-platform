import React, { useEffect, useRef, useMemo, useState, Fragment, Children } from 'react';
import {
  Form,
  Input,
  DatePicker,
  Divider,
  Select,
  Button,
  Space,
  Descriptions,
  Tooltip,
} from 'antd';
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
import { formateStatus, useNextStep } from '../../config';
import { useModel } from 'umi';
import { AreaChartOutlined } from '@ant-design/icons';
import Condition from '@/components/Condition';
import LineChart from './component/lineChart';
import { throttle } from '../utils/util';
import { getWaitResult } from '../step-select-sample/model/api';
import { getModelStepDetailApi } from '../../model/api';
import { exportExcel, queryVintageLoanTerms } from './model/api';
import moment from 'moment';
import Loadingpage from './loadingpage';

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
  const [stepType, setStepType] = useState<any>(1);

  const [rateFilter, setRateFilter] = useState<any[]>(['M0', 'M1', 'M2', 'M3', 'M4']);
  const [tableType, setTableType] = useState<any>(true);

  const [backData, setBackData] = useState<any>({});

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

  const {
    modelId,
    doneStep,
    curStep,
    setDoneStepStatus,
    setDoneStep,
    isHadReported,
    operate,
    resetScroll,
    setResetScroll,
  } = useModel('step', (model: any) => ({
    modelId: model.modelId,
    doneStep: model.doneStep,
    curStep: model.curStep,
    setDoneStepStatus: model.setDoneStepStatus,
    setDoneStep: model.setDoneStep,
    isHadReported: model.isHadReported,
    operate: model.operate,
    resetScroll: model.resetScroll,
    setResetScroll: model.setResetScroll,
  }));

  useEffect(() => {
    getCurrentStage();
    resize();
    const fn = throttle(() => {
      resize();
    }, 200);
    window.addEventListener('resize', fn);
    return () => {
      window.removeEventListener('resize', fn);
    };
  }, []);

  const getCurrentStage = async () => {
    let res = await getWaitResult({ itmModelRegisCode: modelId });
    if (res?.status?.code == successCode) {
      let data = res?.result || {};

      if (data?.currentStage > 4) {
        getSubmitValue(); //回显
      }

      if (data?.currentStageStatus) {
        setDoneStepStatus(formateStatus(Number(data?.currentStageStatus)));
      }
      if (
        data?.currentStage == 4 &&
        data?.currentStageStatus == '1' &&
        data?.isCommittedPage == '1'
      ) {
        setStepType(2);
      }
    }
  };

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
    loading,
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
    originProductList,
    originChannelMidList,
    originChannelSmList,
    originCustCatList,
  } = useSearchModel();

  const { nextStep } = useNextStep();

  //维度
  const changeDimension = async (val: any) => {
    // setProductList([]);
    // setChannelMidList([]);
    // setChannelSmList([]);
    // setCustCatList([]);
    await getparams({ businessType: val });

    formRef?.current?.setFieldsValue({
      prodCat: undefined,
      channelCatM: undefined,
      channelCatS: undefined,
      custCat: undefined,
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

    let obj: any = {};
    if (val.length > 0) {
      let list: any[] = [];
      if (val?.includes('全部')) {
        list = originChannelMidList;
        if (!originChannelMidList?.length) {
          console.log(productList);
          list = [
            {
              name: '全部',
              label: '全部',
            },
          ];
          productList?.map((ele: any) => {
            let tempChild: any[] = ele?.children ? ele?.children : [];
            list = [...list, ...tempChild];
          });
        }
      } else {
        val?.map((ele: any) => {
          // let temp: any = productList?.find((item: any) => item.name == ele);
          let tempChild: any = [];
          if (originChannelMidList?.length) {
            originProductList.forEach((item) => {
              if (item.name == ele) {
                tempChild = item?.children ? [...tempChild, ...item?.children] : tempChild;
              }
            });
          } else {
            productList.forEach((item) => {
              if (item.name == ele) {
                tempChild = item?.children ? [...tempChild, ...item?.children] : tempChild;
              }
            });
          }
          list = [...list, ...tempChild];
        });
      }
      obj.prodCat = val;
      console.log(list);
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
      custCat: undefined,
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
        val?.map((ele: any) => {
          // let temp: any = channelMidList.find((item: any) => item.name == ele);
          let tempChild: any = [];
          originChannelMidList.forEach((item) => {
            if (item.name == ele) {
              tempChild = item?.children ? [...tempChild, ...item?.children] : tempChild;
            }
          });
          list = [...list, ...tempChild];
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
      custCat: undefined,
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
          let tempChild: any = [];
          originChannelSmList.forEach((item) => {
            if (item.name == ele) {
              tempChild = item?.children ? [...tempChild, ...item?.children] : tempChild;
            }
          });
          list = [...list, ...tempChild];
        });
      }
      obj.channelCatS = val;
      setCustCatList(list);
    } else {
      setCustCatList([]);
    }
    formRef?.current?.setFieldsValue({
      custCat: undefined,
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
      obj.custCat = val;
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
        initialValue: ['全部'],
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
          // 借据层: '借据层',
        },
        hideInTable: true,
        initialValue: '进件层',
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
        initialValue: '账户数',
      },
    ];
    return [..._columns, ...extra];
  };

  const _rateColumns = useMemo(
    () => getRateColumns(rateColumns),
    [rateColumns, yearMonth, useTimeData, limitTimeData],
  );

  useEffect(() => {
    getdefValue();
    // getConditionList();
    getYaerMonth();
  }, []);

  const getdefValue = async () => {
    //回显默认
    await getProdChannelList({ itmModelRegisCode: modelId }).then(async (res) => {
      if (res?.status?.code == successCode) {
        // await getparams({ businessType: 'SX' });
        let obj = { ...res?.result?.defaultSelection };
        Object?.keys(obj).forEach((item) => {
          if (!(obj[item] && obj[item]?.length)) {
            delete obj[item];
          }
        });
        console.log(obj);

        formRef?.current?.setFieldsValue({
          ...obj,
          channelCatM: obj?.['channelCatM']?.split(','),
          channelCatS: obj?.['channelCatS']?.split(','),
          custCat: obj?.['custCat']?.split(','),
          prodCat: obj?.['prodCat']?.split(','),
        });
      }
    });
  };

  const getSubmitValue = async () => {
    //回显
    await getModelStepDetailApi({ stage: '4', itmModelRegisCode: modelId })
      .then((res) => {
        if (res.status.code == successCode) {
          let data = res?.result;
          // itmModelRegisCode: modelId,
          // customerDefinition: value,
          //   ...formData,
          setBackData(data);

          let preanalysisCondition = data?.preanalysisCondition || {};
          preanalysisCondition.dimension = preanalysisCondition?.dimension;
          preanalysisCondition.indexList = preanalysisCondition?.indexList;

          preanalysisCondition.prodCat = preanalysisCondition?.prodCat?.split?.(',');
          preanalysisCondition.channelCatM = preanalysisCondition?.channelCatM?.split?.(',');
          preanalysisCondition.channelCatS = preanalysisCondition?.channelCatS?.split?.(',');
          preanalysisCondition.custCat = preanalysisCondition?.custCat?.split?.(',');
          //为空去掉不设
          Object?.keys(preanalysisCondition).forEach((item) => {
            if (!(preanalysisCondition[item] && preanalysisCondition[item]?.length)) {
              delete preanalysisCondition[item];
            }
          });
          formRef?.current?.setFieldsValue(preanalysisCondition);

          let preanalysisRollRateCondition = data?.preanalysisRollRateCondition || {};
          preanalysisRollRateCondition.paymentTime = preanalysisRollRateCondition?.paymentTime
            ?.split?.(',')
            ?.map((item: any) => moment(item));
          preanalysisRollRateCondition.loadTerm = preanalysisRollRateCondition?.loadTerm?.length
            ? preanalysisRollRateCondition.loadTerm?.split?.(',')
            : ['全部'];

          console.log(preanalysisRollRateCondition);

          formRef2?.current?.setFieldsValue({ ...preanalysisRollRateCondition });

          form?.setFieldsValue({
            vintageConclusion: data?.vintageConclusion,
            rollRateConclusion: data?.rollRateConclusion,
          });
          customerFormRef?.setFieldsValue(data?.customerDefinition || {});
        }
      })
      .finally(() => {
        console.log(formRef?.current?.getFieldsValue());

        formRef?.current?.submit();
        formRef2?.current?.submit();
      });
  };

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
        res?.result?.map?.((item: any, index: any) => ({
          ...item,
          idx: index,
          children: item?.monthList?.map((ite: any, idx: any) => ({
            ...ite,
            idx: `${index}-${idx}`,
          })),
        })) || [];
      let columns: any[] = [
        {
          key: 'name',
          label: '本期状态',
        },
        {
          key: 'm0',
          label: 'M0',
        },
        {
          key: 'm1',
          label: 'M1',
        },
        {
          key: 'm2',
          label: 'M2',
        },
        {
          key: 'm3',
          label: 'M3',
        },
        {
          key: 'm4',
          label: 'M4',
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
                  {
                    text: 'M3',
                    value: 'M3',
                  },
                  {
                    text: 'M4',
                    value: 'M4',
                  },
                ]
              : null,
        };
      });

      console.log(filter);
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
      let formData = form.getFieldsValue();
      if (value) {
        let reqData = {
          itmModelRegisCode: modelId,
          customerDefinition: value,
          ...formData,
          preanalysisCondition: formRef?.current?.getFieldsValue(),
          preanalysisRollRateCondition: formRef2?.current?.getFieldsValue(),
        };

        reqData.preanalysisRollRateCondition.paymentTime =
          reqData?.preanalysisRollRateCondition?.paymentTime
            ?.map((item: any) => moment(item)?.format?.('YYYY-MM'))
            ?.join?.();
        reqData.preanalysisRollRateCondition.loadTerm =
          reqData?.preanalysisRollRateCondition?.loadTerm?.join();

        reqData.preanalysisCondition.prodCat = reqData?.preanalysisCondition?.prodCat?.join();
        reqData.preanalysisCondition.channelCatM =
          reqData?.preanalysisCondition?.channelCatM?.join();
        reqData.preanalysisCondition.channelCatS =
          reqData?.preanalysisCondition?.channelCatS?.join();
        reqData.preanalysisCondition.custCat = reqData?.preanalysisCondition?.custCat?.join();

        exportExcel(reqData)
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

        reqData.preanalysisRollRateCondition.paymentTime =
          reqData?.preanalysisRollRateCondition?.paymentTime
            ?.map((item: any) => moment(item)?.format?.('YYYY-MM'))
            ?.join?.();
        reqData.preanalysisRollRateCondition.loadTerm =
          reqData?.preanalysisRollRateCondition?.loadTerm?.join();

        reqData.preanalysisCondition.prodCat = reqData?.preanalysisCondition?.prodCat?.join();
        reqData.preanalysisCondition.channelCatM =
          reqData?.preanalysisCondition?.channelCatM?.join();
        reqData.preanalysisCondition.channelCatS =
          reqData?.preanalysisCondition?.channelCatS?.join();
        reqData.preanalysisCondition.custCat = reqData?.preanalysisCondition?.custCat?.join();

        console.log(reqData);
        nextFlow(reqData).then(async (res) => {
          if (res) {
            // nextStep();
            setResetScroll(resetScroll + 1);
            setStepType(2);
          } else {
            getStatus();
          }
        });
      }
    });
  };

  const getStatus = async () => {
    let res: any = await getWaitResult({ itmModelRegisCode: modelId });
    let data = res?.result || {};
    if (data?.currentStage) {
      setDoneStep(data?.currentStage);
    }
    if (data?.currentStageStatus) {
      setDoneStepStatus(formateStatus(Number(data?.currentStageStatus)));
    }
  };

  return (
    <div className={styles['step-page']}>
      {pageType !== 'viewReport' && (
        <div className={styles['step-title']}>
          <span>前期分析</span>
          <TitleStatus index={4} />
        </div>
      )}

      <Condition r-if={stepType == 1}>
        <p className={styles.commonTitle}>VINTAGE分析</p>
        <div className={styles.commonTable}>
          <ProTable<any>
            // params={searchForm}
            columns={_vcolumns}
            actionRef={tableRef}
            loading={vloading}
            scroll={{ x: _vcolumns.length * 200 }}
            request={async (params = {}, sort, filter) => {
              console.log(params);
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
              span: 8,
              // collapsed: false,
              defaultCollapsed: false,
              collapseRender: () => null,
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
              ignoreRules: false,
            }}
            pagination={false}
            dateFormatter="string"
            headerTitle="VINTAGE分析结果"
            toolBarRender={() => []}
            toolbar={{
              actions: [
                <Tooltip title={'切换为图表/表格展示'} placement={'topRight'}>
                  <AreaChartOutlined
                    onClick={() => {
                      setTableType(!tableType);
                    }}
                    style={{
                      color: tableType ? 'gray' : '#40a9ff',
                      border: '1px solid',
                      padding: 4,
                    }}
                  />
                </Tooltip>,
              ],
            }}
            options={false}
            tableStyle={{ display: tableType ? 'block' : 'none' }}
            manualRequest={true}
          />
          <Condition r-show={!tableType}>
            <LineChart
              base={base}
              tableType={tableType}
              columns={vChartColumns}
              data={vintageList}
            />
          </Condition>
        </div>
        {pageType !== 'viewReport' && (
          <Form form={form} layout="vertical">
            <FormItem name="vintageConclusion" label="VINTAGE分析结论" style={{ width: '100%' }}>
              <TextArea rows={4} placeholder="请输入VINTAGE分析结论" maxLength={500} />
            </FormItem>
          </Form>
        )}
        {pageType == 'viewReport' && (
          <Descriptions bordered column={2}>
            <Descriptions.Item label="VINTAGE分析结论">
              {backData?.vintageConclusion}
            </Descriptions.Item>
          </Descriptions>
        )}
        <Divider />
        <p className={styles.commonTitle}>滚动率分析</p>
        <div className={styles.commonTable}>
          <ProTable
            actionRef={rateRef}
            formRef={formRef2}
            headerTitle="滚动率分析结果"
            rowKey={(r) => r.idx}
            toolBarRender={() => []}
            options={{ density: false, fullScreen: false, reload: false, setting: true }}
            search={{
              labelWidth: 'auto',
              // optionRender: false,
              span: 8,
              // collapsed: false,
              defaultCollapsed: false,
              collapseRender: () => null,
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
            manualRequest={true}
            onChange={rateTableChange}
          />
        </div>
        {pageType !== 'viewReport' && (
          <Fragment>
            <Form form={form} layout="vertical">
              <FormItem name="rollRateConclusion" label="滚动率分析结论" style={{ width: '100%' }}>
                <TextArea rows={4} placeholder="请输入滚动率分析结论" maxLength={500} />
              </FormItem>
            </Form>
            <Divider />
            <p className={styles.commonTitle}>经分析，将好坏客户定义设置为：</p>
            <CustomerFormBox customerFormRef={customerFormRef} />
            <Condition r-if={operate == 'EDIT' && !isHadReported}>
              <NextStepButton
                btnNode={
                  <Space>
                    <Button onClick={exportResult} size="large" loading={loading}>
                      导出结果
                    </Button>
                    <Button onClick={onClick} size="large" type="primary" loading={loading}>
                      下一流程
                    </Button>
                  </Space>
                }
              />
            </Condition>
          </Fragment>
        )}
        {pageType == 'viewReport' && (
          <Descriptions bordered column={2}>
            <Descriptions.Item label="滚动率分析结论">
              {backData?.rollRateConclusion}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Condition>

      <Condition r-if={stepType == 2}>
        <Loadingpage
          back={() => {
            setStepType(1);
          }}
        ></Loadingpage>
      </Condition>
    </div>
  );
};

export default StepPreAnalyze;
