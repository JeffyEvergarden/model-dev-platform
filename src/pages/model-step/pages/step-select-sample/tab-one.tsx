import React, { useEffect } from 'react';
import { Form, Input, DatePicker, Row, Col, Select } from 'antd';
import styles from '../style.less';
import NextStepButton from '../../components/nextstep-button';
import moment from 'moment';
import { useModel, history } from 'umi';
import FeatureCodeForm from './components/featureCodeForm';
import config from '@/config/index';
import { inputNumberRangerList, DatePickerList, RangePickerList } from './model/config';
export const successCode = config.successCode;
import { unique } from '@/utils';

const FormItem = Form.Item;

const TextArea = Input.TextArea;

const { RangePicker }: any = DatePicker;

const { Option } = Select;

const BUSINESSTYPE: any[] = [
  {
    value: 'SX',
    label: '进件层',
  },
];

// 首页
const StepOne: React.FC<any> = (props: any) => {
  // const { initialState, setInitialState } = useModel('@@initialState');
  const {
    form,
    onNext,
    editData,
    labelListRequest,
    labelList,
    featureOperatorMap,
    getparams,
    processList,
    setProcessList,
    productList,
    setProductList,
    channelMidList,
    setChannelMidList,
    channelSmList,
    setChannelSmList,
    custCatList,
    setCustCatList,
    custCatSmList,
    setCustCatSmList,

    operationList,
    setOperationList,
    getSelectionList,
    // paramList,
    originProductList,
    originChannelMidList,
    originChannelSmList,
    originCustCatList,
    originCustCatSmList,
    loading,
  } = props;

  const { isHadBuild, isHadReported } = useModel('step', (model: any) => ({
    isHadBuild: model.isHadBuild,
    isHadReported: model.isHadReported,
  }));

  const [_form] = Form.useForm(form);

  useEffect(() => {
    form.setFieldsValue({
      importType: editData?.importType,

      businessType: editData?.businessType,
      prodCat: getFn(editData?.prodCat),
      channelCatM: getFn(editData?.channelCatM),
      channelCatS: getFn(editData?.channelCatS),
      custCatS: getFn(editData?.custCatS),
      custCat: getFn(editData?.custCat),
      processName: getFn(editData?.processName),

      featureCode: editData?.featureCode,
      operator: editData?.operator,

      // params: editData?.params,
    });
    if (editData?.startTime && editData?.endTime) {
      let start = editData?.startTime ? moment(editData.startTime) : undefined;
      let end = editData?.endTime ? moment(editData.endTime) : undefined;
      form.setFieldsValue({
        date: [start, end],
      });
    }
    if (editData?.featureType == 'number' && inputNumberRangerList.includes(editData?.operator)) {
      let paramsArr = editData?.params?.split(',');
      form.setFieldsValue({
        paramFir: paramsArr?.[0],
        paramTwo: paramsArr?.[1],
      });
    } else if (editData?.featureType == 'datetime' && DatePickerList.includes(editData?.operator)) {
      let paramsDate = moment(editData?.params);
      form.setFieldsValue({
        params: paramsDate,
      });
    } else if (
      editData?.featureType == 'datetime' &&
      RangePickerList.includes(editData?.operator)
    ) {
      let tempArr = editData?.params?.split(',');
      let paramsRangeTime = [moment(tempArr?.[0]), moment(tempArr?.[1])];
      form.setFieldsValue({
        params: paramsRangeTime,
      });
    } else {
      form.setFieldsValue({
        params: editData?.params,
      });
    }
    if (editData?.featureCode) {
      getSelectionList({ labelId: editData?.featureCode });
    }
    // labelListRequest();
    setTimeout(() => {
      setOperationList(featureOperatorMap?.[editData?.featureType]);
    }, 500);
  }, [editData]);

  const getFn = (str: string) => {
    let tempArr: any = [];
    if (!str) {
      tempArr = [];
    }
    tempArr = str?.split(',');
    return tempArr;
  };

  //
  const changeBusinessType = async (val: any) => {
    if (val) {
      let params = {
        businessType: val,
      };
      let res = await getparams(params);
    } else {
      setProductList([]);
      setChannelMidList([]);
      setChannelSmList([]);
      setCustCatList([]);
      setCustCatSmList([]);
      // setProcessList([]);
    }

    form.setFieldsValue({
      prodCat: undefined,
      channelCatM: undefined,
      channelCatS: undefined,
      custCat: undefined,
      custCatS: undefined,
      // processName: undefined,
    });
  };

  const changeProduct = (arr: any, option: any) => {
    let val: any = arr;
    if (arr.length > 0) {
      if (arr[arr.length - 1] == '全部') {
        val = ['全部'];
      } else {
        val = val.filter((item: any) => item != '全部');
      }
      let list: any[] = [];
      if (val?.includes('全部')) {
        let tempChild: any = [
          {
            name: '全部',
            label: '全部',
          },
        ];
        originProductList.forEach((item: any) => {
          tempChild = item?.children ? [...tempChild, ...item?.children] : tempChild;
        });
        list = unique([...list, ...tempChild], 'name');
      } else {
        val.map((ele: any) => {
          let tempChild: any = [];
          originProductList.forEach((item: any) => {
            if (item.name == ele) {
              tempChild = item?.children ? [...tempChild, ...item?.children] : tempChild;
            }
          });
          list = unique([...list, ...tempChild], 'name');
        });
      }
      setChannelMidList(list);
      setChannelSmList([]);
      setCustCatList([]);
      setCustCatSmList([]);
    } else {
      setChannelMidList([]);
      setChannelSmList([]);
      setCustCatList([]);
      setCustCatSmList([]);
    }
    form.setFieldsValue({
      prodCat: val,
      channelCatM: undefined,
      channelCatS: undefined,
      custCat: undefined,
      custCatS: undefined,
    });
  };

  const changeChannelCatM = (arr: any) => {
    let val: any = arr;
    if (val.length > 0) {
      if (arr[arr.length - 1] == '全部') {
        val = ['全部'];
      } else {
        val = val.filter((item: any) => item != '全部');
      }
      let list: any[] = [];
      if (val?.includes('全部')) {
        let tempChild: any = [
          {
            name: '全部',
            label: '全部',
          },
        ];
        originChannelMidList.forEach((item: any) => {
          tempChild = item?.children ? [...tempChild, ...item?.children] : tempChild;
        });
        list = unique([...list, ...tempChild], 'name');
      } else {
        val.forEach((ele: any) => {
          let tempChild: any = [];
          originChannelMidList.forEach((item: any) => {
            if (item.name == ele) {
              tempChild = item?.children ? [...tempChild, ...item?.children] : tempChild;
            }
          });
          list = [...list, ...tempChild];
        });
      }
      setChannelSmList(unique(list, 'name'));
      setCustCatList([]);
      setCustCatSmList([]);
    } else {
      setChannelSmList([]);
      setCustCatList([]);
      setCustCatSmList([]);
    }
    form.setFieldsValue({
      channelCatM: val,
      channelCatS: undefined,
      custCat: undefined,
      custCatS: undefined,
    });
  };

  const changeChannelCatS = (arr: any) => {
    let val: any = arr;
    if (val.length > 0) {
      if (arr[arr.length - 1] == '全部') {
        val = ['全部'];
      } else {
        val = val.filter((item: any) => item != '全部');
      }
      let list: any[] = [];
      if (val?.includes('全部')) {
        let tempChild: any = [
          {
            name: '全部',
            label: '全部',
          },
        ];
        originChannelSmList.forEach((item: any) => {
          tempChild = item?.children ? [...tempChild, ...item?.children] : tempChild;
        });
        list = unique([...list, ...tempChild], 'name');
      } else {
        val.forEach((ele: any) => {
          let tempChild: any = [];
          originChannelSmList.forEach((item: any) => {
            if (item.name == ele) {
              tempChild = item?.children ? [...tempChild, ...item?.children] : tempChild;
            }
          });
          list = [...list, ...tempChild];
        });
      }
      setCustCatList(unique(list, 'name'));
      setCustCatSmList([]);
    } else {
      setCustCatList([]);
      setCustCatSmList([]);
    }
    form.setFieldsValue({
      channelCatS: val,
      custCat: undefined,
      custCatS: undefined,
    });
  };

  const changeCustCat = (arr: any) => {
    let val: any = arr;
    if (val.length > 0) {
      if (arr[arr.length - 1] == '全部') {
        val = ['全部'];
      } else {
        val = val.filter((item: any) => item != '全部');
      }
      let list: any[] = [];
      if (val?.includes('全部')) {
        let tempChild: any = [
          {
            name: '全部',
            label: '全部',
          },
        ];
        originCustCatList.forEach((item: any) => {
          tempChild = item?.children ? [...tempChild, ...item?.children] : tempChild;
        });
        list = unique([...list, ...tempChild], 'name');
      } else {
        val.forEach((ele: any) => {
          let tempChild: any = [];
          originCustCatList.forEach((item: any) => {
            if (item.name == ele) {
              tempChild = item?.children ? [...tempChild, ...item?.children] : tempChild;
            }
          });
          list = [...list, ...tempChild];
        });
      }
      setCustCatSmList(unique(list, 'name'));
    } else {
      setCustCatSmList([]);
    }
    form.setFieldsValue({
      custCat: val,
      custCatS: undefined,
    });
  };

  const changeCustCatS = (arr: any) => {
    let val: any = arr;
    if (val.length > 0) {
      if (arr[arr.length - 1] == '全部') {
        val = ['全部'];
      } else {
        val = val.filter((item: any) => item != '全部');
      }
    }
    form.setFieldsValue({
      custCatS: val,
    });
  };

  const onSelect = (value: any, option: any, type: any) => {
    if (value == '全部') {
      form.setFieldsValue({
        [type]: ['全部'],
      });
    } else {
      let formval = form.getFieldsValue(type);
      let temp = formval?.[type]?.filter((item: any) => item !== '全部');
      form.setFieldsValue({
        [type]: temp,
      });
    }
  };

  const onClick = async () => {
    let val = await form.validateFields();
    if (val.date) {
      val.startTime = val.date?.[0]?.format('YYYY-MM-DD');
      val.endTime = val.date?.[1]?.format('YYYY-MM-DD');
      delete val.date;
    }
    let tempArr: any = [
      'prodCat',
      'channelCatM',
      'channelCatS',
      'custCat',
      'custCatS',
      'processName',
    ];
    Object.keys(val)?.forEach((item: any) => {
      if (tempArr.includes(item)) {
        val[item] = val[item]?.join(',');
      }
    });
    onNext?.(val);
  };

  return (
    <div>
      <Form form={form} layout="vertical" labelAlign="right">
        <div className={styles['antd-form']}>
          <Row gutter={12}>
            <Col span={8}>
              <FormItem
                rules={[{ required: true, message: '请选择日期' }]}
                name="date"
                label="选择日期"
              >
                <RangePicker placeholder={['开始日期', '结束日期']} style={{ width: '100%' }} />
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                rules={[{ required: true, message: '请选择数据维度' }]}
                name="businessType"
                label="数据维度"
              >
                <Select placeholder="请选择数据维度" allowClear onChange={changeBusinessType}>
                  {BUSINESSTYPE.map((item: any, index: number) => {
                    return (
                      <Option value={item.value} key={index}>
                        {item.label}
                      </Option>
                    );
                  })}
                </Select>
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                rules={[{ required: true, message: '请选择产品大类' }]}
                name="prodCat"
                label="产品大类"
                initialValue={'all'}
              >
                <Select
                  placeholder="请选择产品大类"
                  allowClear
                  mode="multiple"
                  onChange={changeProduct}
                >
                  {productList.map((item: any, index: number) => {
                    return (
                      <Option value={item.name} key={index}>
                        {item.name}
                      </Option>
                    );
                  })}
                </Select>
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                rules={[{ required: true, message: '请选择渠道中类' }]}
                name="channelCatM"
                label="渠道中类"
                // initialValue={'all'}
              >
                <Select
                  placeholder="请选择渠道中类"
                  allowClear
                  mode="multiple"
                  onChange={changeChannelCatM}
                >
                  {channelMidList.map((item: any, index: number) => {
                    return (
                      <Option value={item.name} key={index}>
                        {item.name}
                      </Option>
                    );
                  })}
                </Select>
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                rules={[{ required: true, message: '请选择渠道小类' }]}
                name="channelCatS"
                label="渠道小类"
                initialValue={'all'}
              >
                <Select
                  placeholder="请选择渠道小类"
                  allowClear
                  mode="multiple"
                  onChange={changeChannelCatS}
                >
                  {channelSmList.map((item: any, index: number) => {
                    return (
                      <Option value={item.name} key={index}>
                        {item.name}
                      </Option>
                    );
                  })}
                </Select>
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                rules={[{ required: true, message: '请选择客群大类' }]}
                name="custCat"
                label="客群大类"
                initialValue={'all'}
              >
                <Select
                  placeholder="请选择客群大类"
                  allowClear
                  mode="multiple"
                  onChange={changeCustCat}
                >
                  {custCatList.map((item: any, index: number) => {
                    return (
                      <Option value={item.name} key={index}>
                        {item.name}
                      </Option>
                    );
                  })}
                </Select>
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                rules={[{ required: true, message: '请选择客群小类' }]}
                name="custCatS"
                label="客群小类"
                initialValue={['all']}
              >
                <Select
                  placeholder="请选择客群小类"
                  allowClear
                  mode="multiple"
                  onChange={changeCustCatS}
                >
                  {custCatSmList.map((item: any, index: number) => {
                    return (
                      <Option value={item.name} key={index}>
                        {item.name}
                      </Option>
                    );
                  })}
                </Select>
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                rules={[{ required: true, message: '请选择编排维度' }]}
                name="processName"
                label="编排维度"
              >
                <Select
                  placeholder="请选择编排维度"
                  mode="multiple"
                  allowClear
                  optionFilterProp="children"
                  onSelect={(value, opt) => onSelect(value, opt, 'processName')}
                >
                  {processList.map((item: any, index: number) => {
                    return (
                      <Option value={item.name} key={item.index}>
                        {item.name}
                      </Option>
                    );
                  })}
                </Select>
              </FormItem>
            </Col>
          </Row>
        </div>
      </Form>
      <FeatureCodeForm
        form={_form}
        editData={editData}
        labelList={labelList}
        featureOperatorMap={featureOperatorMap}
        operationList={operationList}
        setOperationList={setOperationList}
        // paramList={paramList}
      />
      {isHadBuild !== '1' && isHadReported !== '1' && (
        <NextStepButton onClick={onClick} text={'提交'} loading={loading} />
      )}
    </div>
  );
};

export default StepOne;
