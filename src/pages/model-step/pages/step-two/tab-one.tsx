import React, { useEffect, useRef } from 'react';
import { Form, Input, DatePicker, Row, Col, Select } from 'antd';
import styles from '../style.less';
import NextStepButton from '../../components/nextstep-button';
import { useState } from 'react';
import Condition from '@/components/Condition';

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

// 首页
const StepOne: React.FC<any> = (props: any) => {
  // const { initialState, setInitialState } = useModel('@@initialState');
  const { form } = props;

  const [_form] = Form.useForm(form);

  return (
    <Form form={form} layout="vertical" labelAlign="right">
      <div className={styles['antd-form']}>
        <Row gutter={24}>
          <Col span={8}>
            <FormItem
              rules={[{ required: true, message: '请选择日期' }]}
              name="date"
              label="选择日期"
            >
              <RangePicker
                placeholder={['开始日期', '结束日期']}
                style={{ minWidth: '300px' }}
              ></RangePicker>
            </FormItem>
          </Col>

          <Col span={8}>
            <FormItem
              rules={[{ required: true, message: '请选择数据维度' }]}
              name="column1"
              label="数据维度"
            >
              <Select placeholder="请选择数据维度" allowClear>
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
              rules={[{ required: true, message: '请选择产品大类' }]}
              name="column2"
              label="产品大类"
            >
              <Select placeholder="请选择产品大类" allowClear>
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
              name="column2"
              label="渠道中类"
            >
              <Select placeholder="请选择渠道中类" allowClear>
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
              name="column3"
              label="渠道小类"
            >
              <Select placeholder="请选择渠道小类" allowClear>
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
              name="column4"
              label="客群大类"
            >
              <Select placeholder="请选择客群大类" allowClear>
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
              name="column5"
              label="客群小类"
            >
              <Select placeholder="请选择客群小类" allowClear>
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
              name="column6"
              label="编排调度"
            >
              <Select placeholder="请选择编排调度" allowClear>
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

        <FormItem name="desc1" label="自定义sql条件">
          <TextArea rows={4} placeholder="请输入自定义sql条件" maxLength={200} />
        </FormItem>
      </div>
    </Form>
  );
};

export default StepOne;
