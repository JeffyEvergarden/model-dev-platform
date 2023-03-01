import React, { Fragment, useEffect } from 'react';
import { Form, Select, InputNumber, Space } from 'antd';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import styles from './../../style.less';
import { usePreAnalyzeModel } from '../model';
import { operatorOption } from '../model/config';
import Condition from '@/components/Condition';

const FormItem = Form.Item;
const { Option } = Select;

const formDom = (ruleClips: string, option: any) => {
  return (
    <Fragment>
      <div>
        <Form.List name={ruleClips}>
          {(fields, { add, remove }) => {
            return (
              <Fragment>
                <div>
                  {fields?.map?.(({ key, name, ...restField }, index) => (
                    <div key={index} className={styles.formListBox}>
                      <Condition r-if={index != 0}>
                        <Form.Item
                          label={''}
                          name={[name, 'relation']}
                          initialValue={'and'}
                          rules={[{ required: true, message: '请选择' }]}
                          style={{ width: '100px' }}
                        >
                          <Select>
                            <Option key={'and'} value={'and'}>
                              and
                            </Option>
                            <Option key={'or'} value={'or'}>
                              or
                            </Option>
                            <Option key={'!'} value={'!'}>
                              !
                            </Option>
                          </Select>
                        </Form.Item>
                      </Condition>

                      <Form.Item
                        label={''}
                        name={[name, 'variable']}
                        rules={[{ required: true, message: '请选择' }]}
                        style={{ width: '330px' }}
                      >
                        <Select placeholder="请选择">
                          {option?.map?.((item: any) => {
                            return (
                              <Select.Option key={item.featureCode} value={item.featureCode}>
                                {item.featureName}
                              </Select.Option>
                            );
                          })}
                        </Select>
                      </Form.Item>
                      <Form.Item
                        label={''}
                        name={[name, 'operator']}
                        initialValue={'='}
                        rules={[{ required: true, message: '请选择' }]}
                        style={{ width: '100px' }}
                      >
                        <Select placeholder="请选择">
                          {operatorOption?.map?.((item) => {
                            return (
                              <Select.Option key={item.value} value={item.value}>
                                {item.label}
                              </Select.Option>
                            );
                          })}
                        </Select>
                      </Form.Item>
                      <FormItem
                        name={[name, 'value']}
                        label=""
                        style={{ width: '100px' }}
                        rules={[{ required: true, message: '衡量值为整数' }]}
                      >
                        <InputNumber placeholder="衡量值" precision={0} min={0} />
                      </FormItem>
                      <Condition r-if={index != 0}>
                        <MinusCircleOutlined
                          onClick={() => remove(index)}
                          style={{ marginBottom: '24px', color: 'rgba(24,144,255,1)' }}
                        />
                      </Condition>
                    </div>
                  ))}
                </div>
                <div>
                  <Form.Item label={''}>
                    <div
                      onClick={() =>
                        add(
                          {
                            relation: 'and',
                            variable: '',
                            operator: '=',
                            value: '',
                          },
                          fields.length,
                        )
                      }
                      style={{
                        color: 'rgba(24,144,255,1)',
                        cursor: 'pointer',
                        width: '200px',
                      }}
                    >
                      <Space>
                        <PlusCircleOutlined />
                        <span>添加筛选条件</span>
                      </Space>
                    </div>
                  </Form.Item>
                </div>
              </Fragment>
            );
          }}
        </Form.List>
      </div>
    </Fragment>
  );
};

export default (props: any) => {
  const { customerFormRef } = props;
  const { getCustomerList, goodList, badList, midList } = usePreAnalyzeModel();

  useEffect(() => {
    getCustomerList();
    console.log(customerFormRef?.getFieldsValue());
    customerFormRef?.setFieldsValue({
      good: [{}],
      bad: [{}],
      mid: [{}],
    });
  }, []);
  return (
    <Fragment>
      <Form form={customerFormRef}>
        <div className={styles.commonLabel}>好客户定义</div>
        {formDom('good', goodList)}
        <div className={styles.commonLabel}>坏客户定义</div>
        {formDom('bad', badList)}
        <div className={styles.commonLabel}>中间客户定义</div>
        {formDom('mid', midList)}
      </Form>
    </Fragment>
  );
};
