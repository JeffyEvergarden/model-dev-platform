import React, { useEffect, useRef } from 'react';
import { Form, Input, DatePicker, Row, Col, Radio, Button } from 'antd';
import styles from '../style.less';
import { useState } from 'react';
import Condition from '@/components/Condition';

const FormItem = Form.Item;

const TextArea = Input.TextArea;

const { RangePicker }: any = DatePicker;

// 首页
const StepModelBuild: React.FC<any> = (props: any) => {
  // const { initialState, setInitialState } = useModel('@@initialState');

  const [form] = Form.useForm();

  return (
    <div className={styles['step-page']}>
      <div className={styles['step-title']}>模型构建</div>
    </div>
  );
};

export default StepModelBuild;
