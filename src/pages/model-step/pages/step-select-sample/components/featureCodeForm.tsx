import React, { Fragment, useEffect } from 'react';
import { Form, Input, DatePicker, Row, Col, Select, InputNumber } from 'antd';
import Condition from '@/components/Condition';
import styles from '@/pages/model-step/pages/style.less';
import { successCode, useStepSelectModel } from '../model';
import {
  selectList,
  inputList,
  inputNumberList,
  inputNumberRangerList,
  DatePickerList,
  RangePickerList,
} from '../model/config';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker }: any = DatePicker;

export default (props: any) => {
  const {
    form,
    editData,
    labelList,
    featureOperatorMap,
    operationList,
    setOperationList,
    paramList,
  } = props;

  const { getSelectionList, featureType, setFeatureType, paramType, setParamType } =
    useStepSelectModel();

  useEffect(() => {
    getParamVal(editData?.featureType, editData?.operator);
  }, [editData]);

  const changeLabel = async (val: any, opt: any) => {
    if (val) {
      let params = { labelId: val };
      let res = await getSelectionList(params);
      setOperationList(featureOperatorMap?.[opt?.opt?.featureType]);
      setFeatureType(opt?.opt?.featureType);
      form.setFieldsValue({
        operator: '',
        // params: '',
      });
    } else {
      setFeatureType('');
      setOperationList([]);
      form.setFieldsValue({
        featureCode: '',
        operator: '',
        // params: '',
      });
    }
    setParamType('');
  };

  const changOperator = async (val: any) => {
    if (val) {
      getParamVal(featureType, val);
      form.setFieldsValue({
        params: undefined,
      });
    } else {
      form.setFieldsValue({
        operator: '',
        params: undefined,
      });
      setParamType('');
    }
  };

  //获取param表单类型
  const getParamVal = (featureType: any, operatorType: any) => {
    switch (featureType) {
      case 'boolean':
        setParamType('');
        break;
      case 'string':
        //string有-下拉单选框/字符输入框-两种类型
        if (selectList.includes(operatorType)) {
          setParamType('select');
        } else if (inputList.includes(operatorType)) {
          setParamType('input');
        } else {
          setParamType('');
        }
        break;
      case 'number':
        //number-数字输入框/数字范围输入框/-两种类型
        if (inputNumberList.includes(operatorType)) {
          setParamType('inputNumber');
        } else if (inputNumberRangerList.includes(operatorType)) {
          setParamType('inputNumberRanger');
        } else {
          setParamType('');
        }
        break;
      case 'datetime':
        //datetime-日期时间选择框/时间范围选择框/-两种类型
        if (DatePickerList.includes(operatorType)) {
          setParamType('DatePicker');
        } else if (RangePickerList.includes(operatorType)) {
          setParamType('RangePicker');
        } else {
          setParamType('');
        }
        break;
      case 'list':
        //datetime-带搜索的可输入下拉单选-一种类型
        if (selectList.includes(operatorType)) {
          setParamType('select');
        } else {
          setParamType('');
        }
        break;
      default:
        setParamType('');
    }
  };

  return (
    <Form form={form} layout="vertical" labelAlign="right">
      <Row gutter={12}>
        <Col span={4}>
          <FormItem
            rules={[{ required: false, message: '请选择' }]}
            name="featureCode"
            label="分群建模标签"
          >
            <Select
              placeholder="请选择"
              allowClear
              onChange={(val, opt) => changeLabel(val, opt)}
              optionFilterProp="children"
              showSearch
            >
              {labelList?.map((item: any, index: number) => {
                return (
                  <Option value={item.featureCode} key={item.featureCode} opt={item}>
                    {item.featureName}
                  </Option>
                );
              })}
            </Select>
          </FormItem>
        </Col>
        <Col span={4}>
          <span className={styles.labelSpan}>
            <FormItem
              rules={[{ required: false, message: '请选择' }]}
              name="operator"
              label="操作符"
            >
              <Select
                placeholder="请选择"
                allowClear
                onChange={changOperator}
                optionFilterProp="children"
                showSearch
              >
                {operationList?.map((item: any, index: number) => {
                  return (
                    <Option value={item.value} key={item.value}>
                      {item.name}
                    </Option>
                  );
                })}
              </Select>
            </FormItem>
          </span>
        </Col>
        {/* 下拉单选框 */}
        <Condition r-if={paramType == 'select'}>
          <Col span={8}>
            <span className={styles.labelSpan}>
              <FormItem
                rules={[{ required: false, message: '请选择' }]}
                name="params"
                label="参数值"
              >
                {paramList.length > 0 ? (
                  <Select optionFilterProp="children" allowClear showSearch>
                    {paramList?.map((item: any) => {
                      return (
                        <Option key={item?.value} value={item?.value}>
                          {item?.name}
                        </Option>
                      );
                    })}
                  </Select>
                ) : (
                  <Input placeholder="请输入" />
                )}
              </FormItem>
            </span>
          </Col>
        </Condition>
        {/* 字符输入框 */}
        <Condition r-if={paramType == 'input'}>
          <Col span={8}>
            <span className={styles.labelSpan}>
              <FormItem
                rules={[{ required: false, message: '请输入' }]}
                name="params"
                label="参数值"
              >
                <Input placeholder="请输入" />
              </FormItem>
            </span>
          </Col>
        </Condition>
        {/* 数字输入框 */}
        <Condition r-if={paramType == 'inputNumber'}>
          <Col span={8}>
            <span className={styles.labelSpan}>
              <FormItem
                rules={[{ required: false, message: '请输入' }]}
                name="params"
                label="参数值"
              >
                <InputNumber placeholder="请输入" />
              </FormItem>
            </span>
          </Col>
        </Condition>
        {/* 数字范围输入框 */}
        <Condition r-if={paramType == 'inputNumberRanger'}>
          <Col span={2}>
            <span className={styles.labelSpan}>
              <FormItem
                rules={[{ required: false, message: '请输入' }]}
                name="paramFir"
                label="参数值1"
              >
                <InputNumber placeholder="请输入" />
              </FormItem>
            </span>
          </Col>
          <Col span={2}>
            <span className={styles.labelSpan}>
              <FormItem
                rules={[{ required: false, message: '请输入' }]}
                name="paramTwo"
                label="参数值2"
              >
                <InputNumber placeholder="请输入" />
              </FormItem>
            </span>
          </Col>
        </Condition>
        {/* 日期时间选择框 */}
        <Condition r-if={paramType == 'DatePicker'}>
          <Col span={8}>
            <span className={styles.labelSpan}>
              <FormItem
                rules={[{ required: false, message: '请输入' }]}
                name="params"
                label="参数值"
              >
                <DatePicker showTime format={'YYYY-MM-DD HH:mm:ss'} />
              </FormItem>
            </span>
          </Col>
        </Condition>
        {/* 日期时间选择框 */}
        <Condition r-if={paramType == 'RangePicker'}>
          <Col span={8}>
            <span className={styles.labelSpan}>
              <FormItem
                rules={[{ required: false, message: '请输入' }]}
                name="params"
                label="参数值"
              >
                <RangePicker showTime />
              </FormItem>
            </span>
          </Col>
        </Condition>
      </Row>
    </Form>
  );
};
