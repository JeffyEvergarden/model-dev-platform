import React, { useEffect, useRef } from 'react';
import { Form, Input, DatePicker, Row, Col, Radio, Button } from 'antd';
import styles from '../style.less';
import style from './style.less';
import { useState } from 'react';
import Condition from '@/components/Condition';
import ImportTabOne from './tab-one-import';
import TabOne from './tab-one';
import TabTwo from './tab-two';

const FormItem = Form.Item;

const TextArea = Input.TextArea;

const { RangePicker }: any = DatePicker;

// 首页
const StepOne: React.FC = (props: any) => {
  // const { initialState, setInitialState } = useModel('@@initialState');

  const [form1] = Form.useForm();

  const [form2] = Form.useForm();

  const [tabType, setTabType] = useState<any>(1); // 导入数据类型 0、1  // 0 -> 是， 1 -> 否

  const [stepType, setStepType] = useState<any>(1); //  1、2  //  1-> 选择条件    2--> 导入进度

  // 过程id
  const [processId, setProcessId] = useState<any>('1233');

  useEffect(() => {}, []);

  const onChange = (e: any) => {
    setTabType(e.target.value);
  };

  // 下一个步骤
  const clickNextStep = () => {
    setStepType(2);
  };

  // 重新选取

  const onClickReSelect = () => {
    setStepType(1);
  };

  return (
    <div className={styles['step-page']}>
      <div className={styles['step-title']}>样本选取</div>

      {/* 步骤一 */}
      <Condition r-if={stepType === 1}>
        <div className={style['sub-box']}>
          <span style={{ marginRight: '12px' }}>是否导入</span>
          <Radio.Group onChange={onChange} value={tabType} size="large">
            <Radio value={0}>是</Radio>
            <Radio value={1}>否</Radio>
          </Radio.Group>
        </div>

        <Condition r-if={tabType === 0}>
          <ImportTabOne form={form1} onNext={clickNextStep} />
        </Condition>

        <Condition r-if={tabType === 1}>
          <TabOne form={form2} onNext={clickNextStep} />
        </Condition>
      </Condition>

      {/* 步骤二 */}

      <Condition r-if={stepType === 2}>
        <TabTwo
          tabType={tabType}
          processId={processId}
          extra={
            <Button size="large" onClick={onClickReSelect}>
              重新选取
            </Button>
          }
        />
      </Condition>
    </div>
  );
};

export default StepOne;
