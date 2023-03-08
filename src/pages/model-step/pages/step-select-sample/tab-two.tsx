import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Form, Input, DatePicker, Button, Select, Space } from 'antd';
import styles from './style.less';
import NextStepButton from '../../components/nextstep-button';
import CommonPage from '../../components/common-page';
import Condition from '@/components/Condition';
import { useSampleUploadAwaitModel, useSample } from './model';
import { tabSelectColumns, tabSelectColumnsTwo } from './model/config';
import { useModel } from 'umi';

const FormItem = Form.Item;

const TextArea = Input.TextArea;

const { RangePicker }: any = DatePicker;

const { Option } = Select;

// 首页
const StepTwo: React.FC<any> = (props: any) => {
  // const { initialState, setInitialState } = useModel('@@initialState');
  const { loading, form, onNext, tabType, onClickReSelect, nextFlow, stepType } = props;

  const [_form] = Form.useForm(form);

  const { modelId, isHadBuild, isHadReported, isReadonly, doneStep, curStep, setDoneStepStatus } =
    useModel('step', (model: any) => ({
      modelId: model.modelId,
      doneStep: model.doneStep,
      curStep: model.curStep,
      isHadBuild: model.isHadBuild,
      isHadReported: model.isHadReported,
      isReadonly: model.isReadonly,
      setDoneStepStatus: model.setDoneStepStatus,
    }));

  // 表单是否可以编辑
  const isDisabled = isHadReported || isHadBuild || isReadonly;

  const { processType, startLoop, desc, fake } = useSampleUploadAwaitModel();
  const { getSample } = useSample();

  const [detailInfo, setDetailInfo] = useState<any>({});
  const onClick = () => {
    onNext?.();
  };

  useEffect(() => {
    if (curStep + 1 < doneStep) {
      startLoop({ itmModelRegisCode: modelId }, 4, 'finish');
    } else {
      startLoop({ itmModelRegisCode: modelId }, 4, '');
    }
    getCurrentDetail();
    return () => clearInterval(fake?.current?.timeFn);
  }, [stepType]);

  //状态改变时重新请求详情--更新创建时间字段
  useEffect(() => {
    if (processType == 'finish' || processType == 'error') {
      getCurrentDetail();
    }
    setDoneStepStatus(processType);
  }, [processType]);

  const getCurrentDetail = async () => {
    let params = {
      itmModelRegisCode: modelId,
    };
    let res = await getSample(params);
    setDetailInfo({ ...res?.result?.sampleParam?.featureLabel, ...res?.result?.sampleParam });
  };

  return (
    <div>
      <CommonPage
        loadingContent={
          <>
            {tabType == '0' && (
              <Fragment>
                <div className={styles['title']}>样本选取中</div>
                <div className={styles['desc']}>请稍后，待样本选取完成后可开始下一个流程</div>
              </Fragment>
            )}
            {tabType == '1' && (
              <Fragment>
                <div className={styles['title']}>样本导入中</div>
                <div className={styles['desc']}>请稍后，待样本导入完成后可开始下一个流程</div>
              </Fragment>
            )}
          </>
        }
        sucessContent={
          <>
            {tabType == '0' && <div className={styles['title']}>样本选取成功</div>}
            {tabType == '1' && <div className={styles['title']}>样本导入成功</div>}
            <div className={styles['desc']} />
          </>
        }
        errorContent={
          <>
            {tabType == '0' && <div className={styles['title']}>样本选取失败</div>}
            {tabType == '1' && <div className={styles['title']}>样本导入失败</div>}
            <div className={styles['desc']}>失败原因：{desc}</div>
          </>
        }
        pageType={processType}
        columns={
          detailInfo?.importType == '0'
            ? tabSelectColumns
            : detailInfo?.importType == '1'
            ? tabSelectColumnsTwo
            : []
        }
        detailInfo={detailInfo}
      />
      <Condition r-if={processType !== 'loading' && !isDisabled}>
        <NextStepButton
          btnNode={
            processType == 'error' ? (
              <Space>
                <Button size="large" onClick={onClickReSelect} loading={loading}>
                  重新选取
                </Button>
              </Space>
            ) : (
              <Space>
                <Button size="large" onClick={onClickReSelect} loading={loading}>
                  重新选取
                </Button>
                <Button size="large" onClick={nextFlow} type="primary" loading={loading}>
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

export default StepTwo;
