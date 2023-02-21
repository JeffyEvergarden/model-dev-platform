import React, { useEffect } from 'react';
import { Form, Input, DatePicker, Row, Col, Select } from 'antd';
import styles from '../style.less';
import NextStepButton from '../../components/nextstep-button';
import moment from 'moment';
import FeatureCodeForm from './components/featureCodeForm';

const FormItem = Form.Item;

const TextArea = Input.TextArea;

const { RangePicker }: any = DatePicker;

const { Option } = Select;

const demoList: any[] = [
  {
    value: 1,
    label: '选择一',
  },
  {
    value: 2,
    label: '选择二',
  },
];

const BUSINESSTYPE: any[] = [
  {
    value: 'SX',
    label: '进件层',
  },
];

// 首页
const StepOne: React.FC<any> = (props: any) => {
  // const { initialState, setInitialState } = useModel('@@initialState');
  const { form, onNext, editData } = props;

  const [_form] = Form.useForm(form);

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

      featureCode: editData?.featureLabel?.featureCode,
      operator: editData?.featureLabel?.operator,
      params: editData?.featureLabel?.params,
    });
  }, [editData]);

  const getFn = (str: string) => {
    let tempArr: any = [];
    if (!str) {
      tempArr = [];
    }
    tempArr = str?.split(',');
    return tempArr;
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
                <Select placeholder="请选择数据维度" allowClear>
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
              >
                <Select placeholder="请选择产品大类" allowClear mode="multiple">
                  {demoList.map((item: any, index: number) => {
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
                rules={[{ required: true, message: '请选择渠道中类' }]}
                name="channelCatM"
                label="渠道中类"
              >
                <Select placeholder="请选择渠道中类" allowClear mode="multiple">
                  {demoList.map((item: any, index: number) => {
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
                rules={[{ required: true, message: '请选择渠道小类' }]}
                name="channelCatS"
                label="渠道小类"
              >
                <Select placeholder="请选择渠道小类" allowClear mode="multiple">
                  {demoList.map((item: any, index: number) => {
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
                rules={[{ required: true, message: '请选择客群大类' }]}
                name="custCat"
                label="客群大类"
              >
                <Select placeholder="请选择客群大类" allowClear mode="multiple">
                  {demoList.map((item: any, index: number) => {
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
                rules={[{ required: true, message: '请选择客群小类' }]}
                name="custCatS"
                label="客群小类"
              >
                <Select placeholder="请选择客群小类" allowClear mode="multiple">
                  {demoList.map((item: any, index: number) => {
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
                rules={[{ required: true, message: '请选择编排调度' }]}
                name="processName"
                label="编排调度"
              >
                <Select placeholder="请选择编排调度" allowClear mode="multiple">
                  {demoList.map((item: any, index: number) => {
                    return (
                      <Option value={item.value} key={index}>
                        {item.label}
                      </Option>
                    );
                  })}
                </Select>
              </FormItem>
            </Col>
          </Row>
        </div>
      </Form>
      <FeatureCodeForm form={_form} />
      <NextStepButton onClick={onClick} text={'提交'} />
    </div>
  );
};

export default StepOne;
