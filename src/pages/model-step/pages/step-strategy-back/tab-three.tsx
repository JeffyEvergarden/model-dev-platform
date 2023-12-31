import React, { useEffect, useRef, useState } from 'react';
import { Form, Input, DatePicker, Row, Col, Select, Space, Button } from 'antd';
import styles from './style.less';
import NextStepButton from '../../components/nextstep-button';
import CommonPage from '../../components/common-page';
import Condition from '@/components/Condition';
import { successCode, useStrategyBackUploadAwaitModel } from './model';
import { formateStatus, useNextStep } from '../../config';
import { useModel } from 'umi';
import { getWaitResult } from './model/api';

// import { tabSelectColumns } from './model/config';

const FormItem = Form.Item;

const TextArea = Input.TextArea;

const { RangePicker }: any = DatePicker;

const { Option } = Select;

// 首页
const TabThree: React.FC<any> = (props: any) => {
  // const { initialState, setInitialState } = useModel('@@initialState');
  const { processId, form, onNext, extra, selectedKeys, again, back } = props;

  const [_form] = Form.useForm(form);
  const fake = useRef<any>({});

  const { modelId, setDoneStepStatus, doneStep, setDoneStep } = useModel('step', (model: any) => ({
    modelId: model.modelId,
    setDoneStepStatus: model.setDoneStepStatus,
    doneStep: model.doneStep,
    setDoneStep: model.setDoneStep,
  }));

  const { submitProcess, passBackStep } = useStrategyBackUploadAwaitModel();

  const { processType, dataList, errorMsg, startLoop, nextFlow } =
    useStrategyBackUploadAwaitModel();
  const { nextStep } = useNextStep();

  const onClick = () => {
    // onNext?.();
    nextFlow({ itmModelRegisCode: modelId }).then((res) => {
      if (res) {
        nextStep();
      }
    });
  };

  const getskip = async () => {
    let reqData = { itmModelRegisCode: modelId };
    let res = await getWaitResult({ itmModelRegisCode: modelId });
    let data = res?.result || {};
    if (data?.currentStage) {
      setDoneStep(data?.currentStage);
    }
    if (data?.currentStageStatus) {
      setDoneStepStatus(formateStatus(Number(data?.currentStageStatus)));
    }
    await passBackStep(reqData).then((res: any) => {
      if (res?.result?.skipCurrentStageStatus == '1') {
        clearTimeout(fake.current.timeFn);
        //跳到下一流程
        nextStep();
      } else {
        if (res?.status?.code == successCode) {
        } else {
          clearTimeout(fake.current.timeFn);
          back();
        }
      }
    });
  };

  useEffect(() => {
    if (doneStep == 3) {
      setDoneStepStatus('process');
    }
    fake.current.timeFn = setInterval(async () => {
      getskip();
    }, 2 * 1000);
    return () => {
      clearTimeout(fake.current.timeFn);
    };
  }, []);

  return (
    <div>
      <CommonPage
        loadingContent={
          <>
            <div className={styles['title']}>正在处理中</div>
            <div className={styles['desc']}></div>
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
            <div className={styles['desc']}>失败原因：{errorMsg}</div>
          </>
        }
        pageType={'loading'}
      />
    </div>
  );
};

export default TabThree;
