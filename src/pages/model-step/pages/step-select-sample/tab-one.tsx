import React, { useEffect } from 'react';
import { Form, Input, DatePicker, Row, Col, Select } from 'antd';
import styles from '../style.less';
import NextStepButton from '../../components/nextstep-button';
import moment from 'moment';
import FeatureCodeForm from './components/featureCodeForm';
import { useStepSelectModel } from './model';
import config from '@/config/index';
import { inputNumberRangerList, DatePickerList, RangePickerList } from './model/config';
export const successCode = config.successCode;

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
  const { form, onNext, editData, labelList, featureOperatorMap } = props;

  const [_form] = Form.useForm(form);

  const {
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
    paramList,

    originChannelMidList,
    originChannelSmList,
    originCustCatList,
    originCustCatSmList,
  } = useStepSelectModel();

  useEffect(() => {
    let start = editData?.startTime ? moment(editData.startTime) : null;
    let end = editData?.endTime ? moment(editData.endTime) : null;
    form.setFieldsValue({
      importType: editData?.importType,
      date: [start, end],
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
    setOperationList(featureOperatorMap?.[editData?.featureType]);
    // setOperationList([])
    if (editData?.featureCode) {
      getSelectionList({ labelId: editData?.featureCode });
    }
    if (editData?.featureType == 'number' && inputNumberRangerList.includes(editData?.operator)) {
      let paramsArr = editData?.params?.split(',');
      form.setFieldsValue({
        paramFir: paramsArr?.[0],
        paramTwo: paramsArr?.[1],
      });
    }

    if (editData?.featureType == 'datetime' && DatePickerList.includes(editData?.operator)) {
      let paramsDate = moment(editData?.params);
      form.setFieldsValue({
        params: paramsDate,
      });
    }

    if (editData?.featureType == 'datetime' && RangePickerList.includes(editData?.operator)) {
      let tempArr = editData?.params?.split(',');
      let paramsRangeTime = [moment(tempArr?.[0]), moment(tempArr?.[1])];
      form.setFieldsValue({
        params: paramsRangeTime,
      });
    }
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
      setProcessList([]);
    }

    form.setFieldsValue({
      prodCat: undefined,
      channelCatM: undefined,
      channelCatS: undefined,
      custCat: undefined,
      custCatS: undefined,
      processName: undefined,
    });
  };

  const changeProduct = (val: any, option: any) => {
    if (val.length > 0) {
      let list: any[] = [];
      if (val?.includes('all')) {
        list = originChannelMidList;
      } else {
        val.forEach((ele: any) => {
          let temp: any = productList.find((item: any) => item.value == ele);
          list = [...list, ...temp?.children];
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

  const onSelect = (value: any, option: any, type: any) => {
    if (value == 'all') {
      form.setFieldsValue({
        [type]: 'all',
      });
    } else {
      let formval = form.getFieldsValue(type);
      let temp = formval?.[type]?.filter((item: any) => item !== 'all');
      form.setFieldsValue({
        [type]: temp,
      });
    }
  };

  const changeChannelCatM = (val: any) => {
    if (val.length > 0) {
      let list: any[] = [];
      if (val?.includes('all')) {
        list = originChannelSmList;
      } else {
        val.forEach((ele: any) => {
          let temp: any = channelMidList.find((item: any) => item.value == ele);
          list = [...list, ...temp?.children];
        });
      }
      setChannelSmList(list);
      setCustCatList([]);
      setCustCatSmList([]);
    } else {
      setChannelSmList([]);
      setCustCatList([]);
      setCustCatSmList([]);
    }
    form.setFieldsValue({
      channelCatS: undefined,
      custCat: undefined,
      custCatS: undefined,
    });
  };

  const changeChannelCatS = (val: any) => {
    if (val.length > 0) {
      let list: any[] = [];
      if (val?.includes('all')) {
        list = originCustCatList;
      } else {
        val.forEach((ele: any) => {
          let temp: any = channelSmList.find((item: any) => item.value == ele);
          list = [...list, ...temp?.children];
        });
      }
      setCustCatList(list);
      setCustCatSmList([]);
    } else {
      setCustCatList([]);
      setCustCatSmList([]);
    }
    form.setFieldsValue({
      custCat: undefined,
      custCatS: undefined,
    });
  };

  const changeCustCat = (val: any) => {
    if (val.length > 0) {
      let list: any[] = [];
      if (val?.includes('all')) {
        list = originCustCatSmList;
      } else {
        val.forEach((ele: any) => {
          let temp: any = custCatList.find((item: any) => item.value == ele);
          list = [...list, ...temp?.children];
        });
      }
      setCustCatSmList(list);
    } else {
      setCustCatSmList([]);
    }
    form.setFieldsValue({
      custCatS: undefined,
    });
  };

  const onClick = async () => {
    let val = await form.validateFields();
    debugger;
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
    debugger;
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
                  onSelect={(value, opt) => onSelect(value, opt, 'prodCat')}
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
                  onSelect={(value, opt) => onSelect(value, opt, 'channelCatM')}
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
                  onSelect={(value, opt) => onSelect(value, opt, 'channelCatS')}
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
                  onSelect={(value, opt) => onSelect(value, opt, 'custCat')}
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
                  onSelect={(value, opt) => onSelect(value, opt, 'custCatS')}
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
                rules={[{ required: true, message: '请选择编排调度' }]}
                name="processName"
                label="编排调度"
              >
                <Select
                  placeholder="请选择编排调度"
                  mode="multiple"
                  allowClear
                  onSelect={(value, opt) => onSelect(value, opt, 'processName')}
                >
                  {processList.map((item: any, index: number) => {
                    return (
                      <Option value={item.name} key={item.value}>
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
        paramList={paramList}
      />
      <NextStepButton onClick={onClick} text={'提交'} />
    </div>
  );
};

export default StepOne;
