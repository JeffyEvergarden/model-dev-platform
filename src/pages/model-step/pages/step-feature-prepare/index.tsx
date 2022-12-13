import React, { useEffect, useRef, useState } from 'react';
import { Form, Input, DatePicker, Row, Col, Radio, Button } from 'antd';
import styles from '../style.less';
import style from './style.less';
import Condition from '@/components/Condition';

const FormItem = Form.Item;

const TextArea = Input.TextArea;

const { RangePicker }: any = DatePicker;

// 首页
const StepFeaturePrepare: React.FC<any> = (props: any) => {
  // const { initialState, setInitialState } = useModel('@@initialState');

  const [form] = Form.useForm();

  return (
    <div className={styles['step-page']}>
      <div className={styles['step-box']}>
        <div className={styles['step-title']}>特征准备</div>
      </div>

      <div className={style['']}>
        <Button type="primary">选择变量</Button>
      </div>
    </div>
  );
};

export default StepFeaturePrepare;
