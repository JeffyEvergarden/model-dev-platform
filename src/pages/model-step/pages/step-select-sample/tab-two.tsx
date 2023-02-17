import React, { useEffect, useRef, useState } from 'react';
import { Form, Input, DatePicker, Button, Select, Space } from 'antd';
import styles from './style.less';
import NextStepButton from '../../components/nextstep-button';
import CommonPage from '../../components/common-page';
import Condition from '@/components/Condition';
import { useSampleUploadAwaitModel, useSample } from './model';

import { tabSelectColumns, tabSelectColumnsTwo } from './model/config';
import { getModelStepDetail } from '../../model/api';

const FormItem = Form.Item;

const TextArea = Input.TextArea;

const { RangePicker }: any = DatePicker;

const { Option } = Select;

// 首页
const StepTwo: React.FC<any> = (props: any) => {
  // const { initialState, setInitialState } = useModel('@@initialState');
  const { processId, form, onNext, tabType, onClickReSelect, nextFlow } = props;

  const [_form] = Form.useForm(form);

  const { processType, awaitResult, startLoop } = useSampleUploadAwaitModel();
  const { getCurrentDetailRequest } = useSample();

  const [detailInfo, setDetailInfo] = useState<any>({});
  const onClick = () => {
    onNext?.();
  };

  useEffect(() => {
    // if (processId) {
    startLoop({ processId }, 4);
    // }
    getCurrentDetail();
  }, [tabType]);

  const getCurrentDetail = async () => {
    let params = {
      itmModelRegisCode: '',
      stage: '2',
    };
    let res = await getCurrentDetailRequest(params);
    setDetailInfo(res?.result?.sampleParam);
  };

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
            <div className={styles['desc']} />
          </>
        }
        errorContent={
          <>
            <div className={styles['title']}>样本选取失败</div>
            <div className={styles['desc']} />
          </>
        }
        pageType={processType}
        columns={tabType == '0' ? tabSelectColumns : tabType == '1' ? tabSelectColumnsTwo : []}
        detailInfo={detailInfo}
      />
      <Condition r-if={processType !== 'loading'}>
        <NextStepButton
          btnNode={
            processType == 'error' ? (
              <Space>
                <Button size="large" onClick={onClickReSelect}>
                  重新选取
                </Button>
              </Space>
            ) : (
              <Space>
                <Button size="large" onClick={onClickReSelect}>
                  重新选取
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

export default StepTwo;
