import React, { useEffect, useRef } from 'react';
import { Form, Input, DatePicker, Button } from 'antd';
import styles from './style.less';

const FormItem = Form.Item;

const TextArea = Input.TextArea;

const { RangePicker }: any = DatePicker;

// 首页
const NextStepButton: React.FC<any> = (props: any) => {
  // const { initialState, setInitialState } = useModel('@@initialState');

  const { text = '下一个流程', onClick } = props;

  return (
    <div className={styles['step-bottom']}>
      <div className={styles['step-left']}></div>

      <div className={styles['step-right']}>
        <Button type="primary" size="large" onClick={onClick}>
          {text}
        </Button>
      </div>
    </div>
  );
};

export default NextStepButton;
