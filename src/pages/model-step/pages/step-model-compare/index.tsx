import React, { useEffect, useRef, useState } from 'react';
import { Form, DatePicker, Space, Button, Tag, Tabs, Select } from 'antd';
import styles from '../style.less';
import { useModel, history } from 'umi';
import Condition from '@/components/Condition';
import ComparePage from './components/comparePage';
import NextStepButton from '../../components/nextstep-button';

// 首页
const StepModelCompare: React.FC<any> = (props: any) => {
  // const { initialState, setInitialState } = useModel('@@initialState');

  const [form] = Form.useForm();

  const [tabList, setTabList] = useState<any>([
    { name: 'model1-1', data: [] },
    { name: 'model1-2', data: [] },
    { name: 'model1-3', data: [] },
    { name: 'model1-4', data: [] },
  ]);

  const nextFlow = async () => {
    const values = await form.validateFields();
    if (!values) {
      return;
    }
    history.push('/modelStep/exportReport');
  };

  return (
    <div className={styles['step-page']}>
      <div className={styles['step-title']}>
        模型对比 <Tag color={'processing'}>进行中</Tag>
      </div>
      <Tabs type="card" size="large">
        {tabList?.map((item: any) => {
          return (
            <Tabs.TabPane tab={item.name} key={item.name}>
              <ComparePage data={item?.data} />
            </Tabs.TabPane>
          );
        })}
      </Tabs>
      <NextStepButton
        extra={
          <div className={styles.compareForm}>
            <Form form={form} layout="inline">
              <Form.Item
                label="选择最优模型"
                name="modelName"
                rules={[{ required: true, message: '请选择最优模型' }]}
              >
                <Select placeholder="请选择模型" style={{ width: '200px' }} allowClear>
                  <Select.Option key={'model_1'} value={'model_1'}>
                    model_1
                  </Select.Option>
                  <Select.Option key={'model_2'} value={'model_2'}>
                    model_2
                  </Select.Option>
                  <Select.Option key={'model_3'} value={'model_3'}>
                    model_3
                  </Select.Option>
                </Select>
              </Form.Item>
            </Form>
          </div>
        }
        btnNode={
          <Space>
            <Button onClick={nextFlow} size="large" type="primary">
              下一流程
            </Button>
          </Space>
        }
      />
    </div>
  );
};

export default StepModelCompare;
