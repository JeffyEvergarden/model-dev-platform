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
import { useModel } from 'umi';
import { useStepSelectModel } from './model';
import { inputNumberRangerList, DatePickerList, RangePickerList } from './model/config';
import { useNextStep } from '@/pages/model-step/config';

const successCode = config.successCode;

const FormItem = Form.Item;

const TextArea = Input.TextArea;

const { RangePicker }: any = DatePicker;

// 首页
const StepOne: React.FC = (props: any) => {
  // const { initialState, setInitialState } = useModel('@@initialState');
  const confirmModalRef: any = useRef();

  const {} = useStepSelectModel();

  const {
    loading,
    getCurrentStageRequest,
    getSample,
    submitSampleRequest,
    confirmSunmitRequest,
    sampleNext,
  } = useSample();

  const {
    labelListRequest,
    labelList,
    featureOperatorMap,

    getparams,
    processList,
    setProcessList,
    productList,
    setProductList,
    channelMidList,
    setChannelMidList,
    channelSmList,
    setChannelSmList,
    custCatList,
    setCustCatList,
    custCatSmList,
    setCustCatSmList,

    operationList,
    setOperationList,
    getSelectionList,
    paramList,

    originChannelMidList,
    originChannelSmList,
    originCustCatList,
    originCustCatSmList,
  } = useStepSelectModel();

  const { nextStep } = useNextStep();

  const { modelId, doneStep, curStep, setDoneStepStatus } = useModel('step', (model: any) => ({
    modelId: model.modelId,
    doneStep: model.doneStep,
    curStep: model.curStep,
    setDoneStepStatus: model.setDoneStepStatus,
  }));

  const [form1] = Form.useForm();

  const [form2] = Form.useForm();

  const [tabType, setTabType] = useState<any>('0'); // 导入数据类型 0、1  // 0 -> 否， 1 -> 是

  const [stepType, setStepType] = useState<any>(1); //  1、2  //  1-> 选择条件    2--> 导入进度

  const [formValTwo, setFormValTwo] = useState<any>({});
  const [batchNo, setBatchNo] = useState<any>('');
  const [editData, setEditData] = useState<any>({});

  useEffect(() => {
    {
      /*
      1、curStep<doneStep:直接进入状态页面
      2、curStep==doneStep ：调用getCurrentStage 如下
      ①currentStageStatus==1且isCommittedPage == '1'进入状态页面，
      ②currentStageStatus == '2'||currentStageStatus == '3'(已完成和失败)进入状态页面
  */
    }
    getCurrentStage();
  }, []);

  const getCurrentStage = async () => {
    if (curStep + 1 < doneStep) {
      setStepType(2);
    } else if (curStep + 1 == doneStep) {
      let res = await getCurrentStageRequest({ itmModelRegisCode: modelId });
      let data = res.result || {};
      if (data.currentStageStatus == '2' || data.currentStageStatus == '3') {
        setStepType(2);
      } else if (data?.currentStageStatus == '1' && data?.isCommittedPage == '1') {
        setStepType(2);
      } else {
        setStepType(1);
        labelListRequest(); //分群建模标签查询
        getSelectDetail();
      }
    }
  };

  const getSelectDetail = async () => {
    let res = await getSample({ itmModelRegisCode: modelId });
    if (res?.status?.code === successCode) {
      setEditData({ ...res?.result?.sampleParam, ...res?.result?.sampleParam?.featureLabel });
      if (res?.result?.samplePara?.businessType) {
        getparams({ businessType: res?.result?.samplePara?.businessType });
      }
    }
  };

  const onChange = (e: any) => {
    setTabType(e.target.value);
  };

  // 提交
  const clickNextStep = async (val: any) => {
    let params = {
      itmModelRegisCode: modelId,
      importType: tabType,
      ...val,
    };
    if (tabType == '0') {
      let tempParams: any;
      let featureType = '';
      labelList.map((item: any) => {
        if (item?.featureCode == val?.featureCode) {
          featureType = item.featureType;
        }
      });
      if (featureType == 'number' && inputNumberRangerList.includes(val?.operator)) {
        tempParams = `${val?.paramFir},${val?.paramTwo}`;
      } else if (featureType == 'datetime' && RangePickerList.includes(val?.operator)) {
        tempParams = `${val?.params?.[0]?.format('YYYY-MM-DD HH:mm:ss')},${val?.params?.[1]?.format(
          'YYYY-MM-DD HH:mm:ss',
        )}`;
      } else if (featureType == 'datetime' && DatePickerList.includes(val?.operator)) {
        tempParams = val?.params?.format('YYYY-MM-DD HH:mm:ss');
      } else {
        tempParams = val?.params;
      }
      delete params?.params;
      params.featureLabel = {
        featureCode: val?.featureCode,
        featureType,
        operator: val?.operator,
        params: tempParams,
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
      itmModelRegisCode: modelId,
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
      itmModelRegisCode: modelId,
    };
    let res = await getSample(params);
    if (res?.status?.code == successCode) {
      setEditData({ ...res?.result?.sampleParam, ...res?.result?.sampleParam?.featureLabel });
      setStepType(1);
      setDoneStepStatus('processing');
      setTabType(res?.result?.sampleParam?.importType);
      getparams({ businessType: res?.result?.sampleParam?.businessType });
    } else {
      message.error(res?.status?.desc || '失败');
    }
  };

  //下一流程
  const nextFlow = async () => {
    let params = {
      itmModelRegisCode: modelId,
    };
    let res = await sampleNext(params);
    if (res?.status?.code == successCode) {
      nextStep();
      // history.push('/modelStep/strategyBack');
    } else {
      message.error(res?.status?.desc || '失败');
    }
  };

  return (
    <div className={styles['step-page']}>
      <div className={styles['step-title']}>
        <span>样本选取</span>
        <TitleStatus index={2} />
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
          <TabOne
            form={form2}
            onNext={clickNextStep}
            editData={editData}
            labelListRequest={labelListRequest}
            labelList={labelList}
            featureOperatorMap={featureOperatorMap}
            getparams={getparams}
            processList={processList}
            setProcessList={setProcessList}
            productList={productList}
            setProductList={setProductList}
            channelMidList={channelMidList}
            setChannelMidList={setChannelMidList}
            channelSmList={channelSmList}
            setChannelSmList={setChannelSmList}
            custCatList={custCatList}
            setCustCatList={setCustCatList}
            custCatSmList={custCatSmList}
            setCustCatSmList={setCustCatSmList}
            operationList={operationList}
            setOperationList={setOperationList}
            getSelectionList={getSelectionList}
            paramList={paramList}
            originChannelMidList={originChannelMidList}
            originChannelSmList={originChannelSmList}
            originCustCatList={originCustCatList}
            originCustCatSmList={originCustCatSmList}
          />
        </Condition>
      </Condition>

      {/* 步骤二 */}

      <Condition r-if={stepType === 2}>
        <TabTwo
          tabType={tabType}
          onClickReSelect={onClickReSelect}
          nextFlow={nextFlow}
          loading={loading}
        />
      </Condition>
      <ConfirmModal cref={confirmModalRef} confirmSunmit={confirmSunmit} loading={loading} />
    </div>
  );
};

export default StepOne;
