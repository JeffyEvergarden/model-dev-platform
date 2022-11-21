import React, { useEffect, useRef } from 'react';
import { Form, Input, DatePicker, Row, Col, Radio } from 'antd';
import styles from '../style.less';
import style from './style.less';
import NextStepButton from '../../components/nextstep-button';
import { useState } from 'react';
import Condition from '@/components/Condition';
import ImportTabOne from './import-tab-one';
import TabOne from './tab-one';
const FormItem = Form.Item;

const TextArea = Input.TextArea;

const { RangePicker }: any = DatePicker;

// 首页
const StepOne: React.FC = (props: any) => {
  // const { initialState, setInitialState } = useModel('@@initialState');

  const [form1] = Form.useForm();

  const [form2] = Form.useForm();

  const [tabType, setTabType] = useState<any>(1); // 导入数据类型 0、1

  const [stepType, setStepType] = useState<any>(1); //  1、2、3

  useEffect(() => {}, []);

  const onChange = (e: any) => {
    setTabType(e.target.value);
  };

  return (
    <div className={styles['step-page']}>
      <div className={styles['step-title']}>样本选取</div>

      <Condition r-if={stepType === 1}>
        <div className={style['sub-box']}>
          <span style={{ marginRight: '12px' }}>是否导入</span>
          <Radio.Group onChange={onChange} value={tabType} size="large">
            <Radio value={0}>是</Radio>
            <Radio value={1}>否</Radio>
          </Radio.Group>
        </div>

        <Condition r-if={tabType === 0}>
          <ImportTabOne form={form1} />
        </Condition>

        <Condition r-if={tabType === 1}>
          <TabOne form={form2} />
        </Condition>
      </Condition>
    </div>
  );
};

export default StepOne;
