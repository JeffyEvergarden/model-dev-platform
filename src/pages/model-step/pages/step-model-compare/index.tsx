import React, { useEffect, useRef } from 'react';
import { Form, Input, DatePicker, Row, Col, Radio, Button, Tag, Tabs } from 'antd';
import styles from '../style.less';
import { useState } from 'react';
import Condition from '@/components/Condition';
import ComparePage from './components/comparePage';

const FormItem = Form.Item;

const { TabPane } = Tabs;

const { RangePicker }: any = DatePicker;

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

  return (
    <div className={styles['step-page']}>
      <div className={styles['step-title']}>
        模型对比 <Tag color={'processing'}>进行中</Tag>
      </div>
      <Tabs
        type="card"
        size="large"
        items={tabList.map((el: any, i: any) => {
          return {
            label: `${el.name}`,
            key: el.name,
            children: <ComparePage data={el?.data} />,
          };
        })}
      />
    </div>
  );
};

export default StepModelCompare;
