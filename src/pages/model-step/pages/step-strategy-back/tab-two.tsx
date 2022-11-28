import React, { useEffect, useRef, useState } from 'react';
import { Form, Input, DatePicker, Row, Col, Select } from 'antd';
import styles from './style.less';
import NextStepButton from '../../components/nextstep-button';
import CommonPage from '../../components/common-page';
import Condition from '@/components/Condition';
import { useStrategyBackUploadAwaitModel } from './model';

// import { tabSelectColumns } from './model/config';

const FormItem = Form.Item;

const TextArea = Input.TextArea;

const { RangePicker }: any = DatePicker;

const { Option } = Select;

// 首页
const TabTwo: React.FC<any> = (props: any) => {
  // const { initialState, setInitialState } = useModel('@@initialState');
  const { processId, form, onNext, extra } = props;

  const [_form] = Form.useForm(form);

  const { processType, startLoop } = useStrategyBackUploadAwaitModel();

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
        pageType={processType}
        columns={[]}
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

export default TabTwo;
