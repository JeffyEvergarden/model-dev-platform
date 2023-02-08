import React, { useEffect, useRef } from 'react';
import { Form, Input, DatePicker, Row, Col, Radio, Button } from 'antd';
import styles from '../style.less';
import { useState } from 'react';
import Condition from '@/components/Condition';
import TabOne from './tab-one';
import TabTwo from './tab-two';

const FormItem = Form.Item;

const TextArea = Input.TextArea;

const { RangePicker }: any = DatePicker;

// 首页
const StepStrategyBack: React.FC<any> = (props: any) => {
  // const { initialState, setInitialState } = useModel('@@initialState');

  const [tabType, setTabType] = useState<any>(1); // 导入数据类型 0、1  // 0 -> 是， 1 -> 否

  const [stepType, setStepType] = useState<any>(1); //  1、2  //  1-> 选择条件    2--> 导入进度

  const [selectedKeys, setSelectedKeys] = useState<any[]>([]);

  // 过程id
  const [processId, setProcessId] = useState<any>('000');

  const onNext = (key: any) => {
    setStepType(2);
    setSelectedKeys(key);
  };

  return (
    <div className={styles['step-page']}>
      <div className={styles['step-title']}>策略回溯</div>

      {/* 步骤一 */}
      <Condition r-if={stepType === 1}>
        <TabOne onNext={onNext} />
      </Condition>

      {/* 步骤二 */}

      <Condition r-if={stepType === 2}>
        <TabTwo tabType={tabType} processId={processId} selectedKeys={selectedKeys}></TabTwo>
      </Condition>
    </div>
  );
};

export default StepStrategyBack;
