import React, { useEffect, useRef, useState } from 'react';
import { Form, Input, DatePicker, Row, Col, Select } from 'antd';
import styles from './style.less';
import NextStepButton from '../../components/nextstep-button';
import CommonPage from '../../components/common-page';
import Condition from '@/components/Condition';

const FormItem = Form.Item;

const TextArea = Input.TextArea;

const { RangePicker }: any = DatePicker;

const { Option } = Select;

// 首页
const StepTwo: React.FC<any> = (props: any) => {
  // const { initialState, setInitialState } = useModel('@@initialState');
  const { form, onNext, extra } = props;

  const [_form] = Form.useForm(form);

  const onClick = () => {
    onNext?.();
  };

  return (
    <div>
      <CommonPage
        loadingContent={
          <>
            <div className={styles['title']}>策略回溯中</div>
            <div className={styles['desc']}>请稍后，待策略回溯完成后可开始下一个流程</div>
          </>
        }
        sucessContent={
          <>
            <div className={styles['title']}>策略回溯成功</div>
            <div className={styles['desc']}></div>
          </>
        }
        errorContent={
          <>
            <div className={styles['title']}>策略回溯失败</div>
            <div className={styles['desc']}></div>
          </>
        }
      />
    </div>
  );
};

export default StepTwo;
