import React, { useEffect, useRef, useState } from 'react';
import { Form, Button, Space } from 'antd';
import styles from './index.less';
import { useModel, history } from 'umi';
import NextStepButton from '@/pages/model-step/components/nextstep-button';
import CommonPage from '@/pages/model-step/components/common-page';
import Condition from '@/components/Condition';
import { useSampleUploadAwaitModel } from '@/pages/model-step/pages/step-select-sample/model';

// 首页
const StepTwo: React.FC<any> = (props: any) => {
  // const { initialState, setInitialState } = useModel('@@initialState');
  const { processId, form, onNext, btnNode, tabType, onClickReSelect, nextFlow } = props;

  const [_form] = Form.useForm(form);

  const { processType, startLoop, desc, fake } = useSampleUploadAwaitModel();

  const { modelId, isHadReported, isReadonly, setDoneStepStatus, doneStep, curStep } = useModel(
    'step',
    (model: any) => ({
      modelId: model.modelId,
      doneStep: model.doneStep,
      curStep: model.curStep,
      isHadReported: model.isHadReported,
      isReadonly: model.isReadonly,
      isHadBuild: model.isHadBuild,
      setDoneStepStatus: model.setDoneStepStatus,
    }),
  );

  // 表单是否可以编辑
  const isDisabled = isHadReported || isReadonly;

  const onClick = () => {
    onNext?.();
  };

  useEffect(() => {
    if (curStep + 1 < doneStep) {
      startLoop({ itmModelRegisCode: modelId }, 4, 'finish');
    } else {
      startLoop({ itmModelRegisCode: modelId }, 4);
    }
    return () => clearInterval(fake?.current?.timeFn);
  }, [tabType]);

  useEffect(() => {
    setDoneStepStatus(processType);
  }, [processType]);

  return (
    <div>
      <CommonPage
        loadingContent={
          <>
            <div className={styles['title']}>建模中</div>
            <div className={styles['desc']}>请稍候，待建模完成后可开始下一个流程</div>
          </>
        }
        sucessContent={
          <>
            <div className={styles['title']}>建模完成</div>
            <div className={styles['desc']} />
          </>
        }
        errorContent={
          <>
            <div className={styles['title']}>建模失败</div>
            <div className={styles['desc']}>失败原因：{desc}</div>
          </>
        }
        pageType={processType}
      />
      <Condition r-if={processType !== 'loading' && !isDisabled}>
        <NextStepButton
          btnNode={
            processType == 'error' ? (
              <Space>
                <Button size="large" onClick={onClickReSelect}>
                  重新建模
                </Button>
              </Space>
            ) : (
              <Space>
                <Button size="large" onClick={onClickReSelect}>
                  重新建模
                </Button>
                <Button size="large" onClick={nextFlow} type="primary">
                  下一流程
                </Button>
              </Space>
            )
          }
          onClick={onClick}
        />
      </Condition>
    </div>
  );
};

{
  /* <Condition r-if={pageType == 'error'}>
<NextStepButton onClick={rebuild} text={'重新建模'} />
</Condition>
<Condition r-if={pageType == 'finish'}>
<NextStepButton
  btnNode={
    <Space>
      <Button onClick={rebuild} size="large">
        重新建模
      </Button>
      <Button onClick={nextFlow} size="large" type="primary">
        下一流程
      </Button>
    </Space>
  }
/>
</Condition> */
}

export default StepTwo;
