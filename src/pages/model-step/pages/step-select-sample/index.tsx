import React, { useEffect, useRef } from 'react';
import { Form, Input, DatePicker, Space, Radio, Button, Row, Col, message } from 'antd';
import styles from '../style.less';
import style from './style.less';
import { useState } from 'react';
import { history } from 'umi';
import Condition from '@/components/Condition';
import TitleStatus from '../../components/title-status';
import ImportTabOne from './tab-one-import';
import ImportTrue from './components/ImportTrue';
import ConfirmModal from './components/confirmModal';
import TabOne from './tab-one';
import TabTwo from './tab-two';
import config from '@/config';
import { useSampleUploadAwaitModel, useSample } from './model';

const successCode = config.successCode;

const FormItem = Form.Item;

const TextArea = Input.TextArea;

const { RangePicker }: any = DatePicker;

// 首页
const StepOne: React.FC = (props: any) => {
  // const { initialState, setInitialState } = useModel('@@initialState');
  const confirmModalRef: any = useRef();

  const { processType } = useSampleUploadAwaitModel();
  const { loading, submitSampleRequest, confirmSunmitRequest, getSampleRequst, sampleNext } =
    useSample();

  const [form1] = Form.useForm();

  const [form2] = Form.useForm();

  const [tabType, setTabType] = useState<any>('0'); // 导入数据类型 0、1  // 0 -> 否， 1 -> 是

  const [stepType, setStepType] = useState<any>(1); //  1、2  //  1-> 选择条件    2--> 导入进度

  // 过程id
  const [processId, setProcessId] = useState<any>('1233');

  const [formValTwo, setFormValTwo] = useState<any>({});
  const [batchNo, setBatchNo] = useState<any>('');
  const [editData, setEditData] = useState<any>({});

  useEffect(() => {}, []);

  const onChange = (e: any) => {
    setTabType(e.target.value);
  };

  // 下一个步骤
  const clickNextStep = async (val: any) => {
    let params = {
      itmModelRegisCode: '',
      ...val,
    };
    if (tabType == '0') {
      params.featureLabel = {
        featureCode: val?.featureCode,
        operator: val?.operator,
        params: val?.params,
      };
    } else if (tabType == '1') {
      params.featureLabel = {
        tableName: val?.tableName,
        dimensionField: val?.dimensionField,
      };
    }
    let res = await submitSampleRequest(params);
    if (res?.status?.code == successCode) {
      message.success(res?.status?.desc || '成功');
      if (tabType == '0') {
        setStepType(2);
      } else if (tabType == '1') {
        confirmModalRef?.current?.open(res?.result?.prepareSql);
        setFormValTwo(val);
        setBatchNo(res?.result?.batchNo);
      }
    } else {
      message.error(res?.status?.desc || '失败');
    }
  };

  const confirmSunmit = async () => {
    let params = {
      itmModelRegisCode: '',
      importType: tabType,
      businessType: formValTwo?.businessType,
      tableName: formValTwo?.tableName,
      dimensionField: formValTwo?.dimensionField,
      batchNo: batchNo,
    };
    let res = await confirmSunmitRequest(params);
    if (res?.status?.code == successCode) {
      confirmModalRef?.current?.close();
      setStepType(2);
    } else {
      message.error(res?.status?.desc || '失败');
    }
  };

  // 重新选取
  const onClickReSelect = async () => {
    let params = {
      itmModelRegisCode: '',
    };
    let res = await getSampleRequst(params);
    if (res?.status?.code == successCode) {
      setEditData(res?.result?.sampleParam);
      setStepType(1);
      setTabType('0');
    } else {
      message.error(res?.status?.desc || '失败');
    }
  };

  //下一流程
  const nextFlow = async () => {
    let params = {
      itmModelRegisCode: '',
    };
    let res = await sampleNext(params);
    if (res?.status?.code == successCode) {
      history.push('/modelStep/strategyBack');
    } else {
      message.error(res?.status?.desc || '失败');
    }
  };

  return (
    <div className={styles['step-page']}>
      <div className={styles['step-title']}>
        <span>样本选取</span>
        <TitleStatus index={2}></TitleStatus>
      </div>

      {/* 步骤一 */}
      <Condition r-if={stepType === 1}>
        <div className={style['sub-box']}>
          <span style={{ marginRight: '12px' }}>是否导入</span>
          <Radio.Group onChange={onChange} value={tabType} size="large">
            <Radio value={'1'}>是</Radio>
            <Radio value={'0'}>否</Radio>
          </Radio.Group>
        </div>

        <Condition r-if={tabType == '1'}>
          {/* <ImportTabOne form={form1} onNext={clickNextStep} /> */}
          <ImportTrue form={form1} onNext={clickNextStep} editData={editData} />
        </Condition>

        <Condition r-if={tabType == '0'}>
          <TabOne form={form2} onNext={clickNextStep} editData={editData} />
        </Condition>
      </Condition>

      {/* 步骤二 */}

      <Condition r-if={stepType === 2}>
        <TabTwo tabType={tabType} onClickReSelect={onClickReSelect} nextFlow={nextFlow} />
      </Condition>
      <ConfirmModal cref={confirmModalRef} confirmSunmit={confirmSunmit} loading={loading} />
    </div>
  );
};

export default StepOne;
