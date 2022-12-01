import React, { useEffect, useRef, useState } from 'react';
import { Form, Input, DatePicker, Row, Col, Select } from 'antd';
import styles from './style.less';
import NextStepButton from '../../components/nextstep-button';
import CommonPage from '../../components/common-page';
import Condition from '@/components/Condition';
import { useSampleUploadAwaitModel } from './model';

import { tabSelectColumns } from './model/config';

const FormItem = Form.Item;

const TextArea = Input.TextArea;

const { RangePicker }: any = DatePicker;

const { Option } = Select;

// 首页
const StepTwo: React.FC<any> = (props: any) => {
  // const { initialState, setInitialState } = useModel('@@initialState');
  const { processId, form, onNext, extra } = props;

  const [_form] = Form.useForm(form);

  const { processType, awaitResult, startLoop } = useSampleUploadAwaitModel();

  const onClick = () => {
    onNext?.();
  };

  useEffect(() => {
    if (processId) {
      startLoop({ processId }, 4);
    }
  }, [processId]);

  return (
    <div>
      <CommonPage
        loadingContent={
          <>
            <div className={styles['title']}>样本选取中</div>
            <div className={styles['desc']}>请稍后，待样本选取完成后可开始下一个流程</div>
          </>
        }
        sucessContent={
          <>
            <div className={styles['title']}>样本选取成功</div>
            <div className={styles['desc']}></div>
          </>
        }
        errorContent={
          <>
            <div className={styles['title']}>样本选取失败</div>
            <div className={styles['desc']}></div>
          </>
        }
        pageType={processType}
        columns={tabSelectColumns}
        detailInfo={{
          isImport: '是',
          rangeDate: '20200113 - 20221130',
          dimension: '进件层',
          productBigClass: '全部',
          channelMidClass: '全部',
          channelSmClass: '全部',
          groupModelTag: '字段名＜衡量值',
        }}
      />
      <Condition r-if={processType === 'finish'}>
        <NextStepButton />
      </Condition>
    </div>
  );
};

export default StepTwo;
