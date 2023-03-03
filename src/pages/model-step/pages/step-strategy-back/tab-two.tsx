import React, { useEffect, useRef, useState } from 'react';
import { Form, Input, DatePicker, Row, Col, Select, Space, Button } from 'antd';
import styles from './style.less';
import NextStepButton from '../../components/nextstep-button';
import CommonPage from '../../components/common-page';
import Condition from '@/components/Condition';
import { useStrategyBackUploadAwaitModel } from './model';
import { useNextStep } from '../../config';
import { useModel } from 'umi';
import { getWaitResult } from '../step-select-sample/model/api';

// import { tabSelectColumns } from './model/config';

const FormItem = Form.Item;

const TextArea = Input.TextArea;

const { RangePicker }: any = DatePicker;

const { Option } = Select;

// 首页
const TabTwo: React.FC<any> = (props: any) => {
  // const { initialState, setInitialState } = useModel('@@initialState');
  const { processId, form, onNext, extra, selectedKeys, again } = props;

  const [_form] = Form.useForm(form);

  const { modelId, curStep, doneStep, setDoneStep, isHadBuild, isHadReported, operate } = useModel(
    'step',
    (model: any) => ({
      modelId: model.modelId,
      curStep: model.curStep,
      doneStep: model.doneStep,
      setDoneStep: model.setDoneStep,
      isHadBuild: model.isHadBuild,
      isHadReported: model.isHadReported,
      operate: model.operate,
    }),
  );

  const { processType, dataList, errorMsg, startLoop, nextFlow, clearTime } =
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

  useEffect(() => {
    let data: any = {};
    (async () => {
      let res = await getWaitResult({ itmModelRegisCode: modelId });
      data = res.result || {};
    })();
    setDoneStep(data.currentStage || 3);
    // if (processId) {

    if (curStep + 1 < (data.currentStage || 3)) {
      startLoop({ itmModelRegisCode: modelId }, 4, 'finish');
    } else {
      startLoop({ itmModelRegisCode: modelId }, 4);
    }

    console.log(operate, processType, isHadBuild, isHadReported);

    // }
    return () => {
      clearTime();
    };
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
            <div className={styles['desc']}>失败原因：{errorMsg}</div>
          </>
        }
        pageType={processType}
        columns={[{ key: 'backtrackProcessName', name: '回溯编排' }]}
        detailInfo={{
          backtrackProcessName: selectedKeys?.join(',') || dataList,
        }}
      />
      <Condition
        r-if={
          operate == 'EDIT' &&
          (processType === 'finish' || processType === 'error') &&
          !isHadBuild &&
          !isHadReported
        }
      >
        <NextStepButton
          btnNode={
            <Space>
              <Button
                onClick={() => {
                  again();
                }}
                size="large"
                type={processType === 'error' ? 'primary' : undefined}
              >
                重新回溯
              </Button>
              <Condition r-if={processType !== 'error'}>
                <Button onClick={onClick} size="large" type="primary">
                  下一流程
                </Button>
              </Condition>
            </Space>
          }
        />
      </Condition>
    </div>
  );
};

export default TabTwo;
