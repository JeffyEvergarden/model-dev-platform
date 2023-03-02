import React, { useEffect, useRef, useState } from 'react';
import { Form, Input, DatePicker, Row, Col, Select, Space, Button } from 'antd';
import styles from './style.less';
import NextStepButton from '../../components/nextstep-button';
import CommonPage from '../../components/common-page';
import Condition from '@/components/Condition';
import { useStrategyBackUploadAwaitModel } from '../step-strategy-back/model';
import { useNextStep } from '../../config';
import { useModel } from 'umi';
import { useVarSelectModal } from './model';

// import { tabSelectColumns } from './model/config';

const FormItem = Form.Item;

const TextArea = Input.TextArea;

const { RangePicker }: any = DatePicker;

const { Option } = Select;

// 首页
const TabTwo: React.FC<any> = (props: any) => {
  // const { initialState, setInitialState } = useModel('@@initialState');
  const { processId, form, onNext, selectList, reset } = props;

  const [_form] = Form.useForm(form);

  const { errorMsg, processType, dataList, startLoop, nextFlow } = useVarSelectModal();
  const { nextStep } = useNextStep();

  const { modelId, curStep, doneStep, isHadBuild, isHadReported } = useModel(
    'step',
    (model: any) => ({
      modelId: model.modelId,
      curStep: model.curStep,
      doneStep: model.doneStep,
      isHadBuild: model.isHadBuild,
      isHadReported: model.isHadReported,
    }),
  );

  const onClick = () => {
    nextFlow({ itmModelRegisCode: modelId }).then((res) => {
      if (res) {
        nextStep();
      }
    });
  };

  useEffect(() => {
    console.log(selectList);
    // if (processId) {
    if (curStep + 1 < doneStep) {
      startLoop({ itmModelRegisCode: modelId }, 4, 'finish');
    } else {
      startLoop({ itmModelRegisCode: modelId }, 4);
    }
    // }
  }, [processId]);

  return (
    <div>
      <CommonPage
        loadingContent={
          <>
            <div className={styles['title']}>特征准备中</div>
            <div className={styles['desc']}>请稍后，待特征准备完成后可开始下一个流程</div>
          </>
        }
        sucessContent={
          <>
            <div className={styles['title']}>特征匹配成功</div>
            <div className={styles['desc']}></div>
          </>
        }
        errorContent={
          <>
            <div className={styles['title']}>特征匹配失败</div>
            <div className={styles['desc']}>失败原因：{errorMsg}</div>
          </>
        }
        pageType={processType}
        columns={[]}
        detailInfo={{}}
        dataList={
          selectList?.map((item: any) => item?.featureName || item) ||
          dataList?.map((item: any) => item?.featureName || item) ||
          []
        }
      />
      <Condition
        r-if={
          (processType === 'finish' || processType === 'error') &&
          isHadBuild !== '1' &&
          isHadReported !== '1'
        }
      >
        <NextStepButton
          btnNode={
            <Space>
              <Button
                onClick={reset}
                size="large"
                type={processType === 'error' ? 'primary' : undefined}
              >
                重新匹配
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
