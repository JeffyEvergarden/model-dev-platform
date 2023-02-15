import React, { useState, useEffect, useRef } from 'react';
import { Tabs, Tag, Space, Button, message } from 'antd';
import styles from '../style.less';
import SampleDefination from './components/sampleDefination';
import InputVariable from './components/InputVariable';
import ScoreCard from './components/scoreCard';
import ModelEffect from './components/modelEffect';
import NextStepButton from '../../components/nextstep-button';
import { useExportReportModel } from './model';
import { useComparePage } from './../step-model-compare/model';
import config from '@/config';
import TitleStatus from '../../components/title-status';
const successCode = config.successCode;
import { changeData } from '@/utils';

const StepExportReport: React.FC<any> = (props: any) => {
  const { loading, setLoading, getSampleDefineDetail, exportPageRequest } = useExportReportModel();
  const { getModelResultRequest } = useComparePage();

  const [sampleData, setSampleData] = useState<any>([]);
  //模型结果
  const [modelResult, setModelResult] = useState<any>({});

  useEffect(() => {
    getSampleData();
    //模型结果
    getModelResult();
  }, []);

  const getSampleData = async () => {
    let params = {
      itmModelRegisCode: '',
      modelVersionName: '',
    };
    let res = await getSampleDefineDetail(params);
    if (res?.result?.prodCatList) {
      res.result.prodCatList = res.result.prodCatList.join(',');
    }
    if (res?.result?.channelCatList) {
      res.result.channelCatList = res.result.channelCatList.join(',');
    }
    setSampleData(res?.result);
  };

  const togetherData = (data: any) => {
    let tempArr: any = [];
    data?.map((item: any, index: any) => {
      item?.boxList?.map((el: any) => {
        tempArr.push({
          idx: index,
          id: el?.variable,
          variable: item?.variable,
          variableName: item?.variableName,
          boxGroup: el?.boxGroup,
          boxGroupScore: el?.boxGroupScore,
          trainBadRate: el?.trainBadRate,
          validBadRate: el?.validBadRate,
          trainGroupRate: el?.trainGroupRate,
          validGroupRate: el?.validGroupRate,
        });
      });
    });
    return changeData(tempArr, 'variable');
  };

  const getModelResult = async () => {
    let params = {
      itmModelRegisCode: '',
      modelVersionName: '',
    };
    let res = await getModelResultRequest(params);
    if (res?.status?.code === successCode) {
      let resultData = res.result;
      if (resultData.scoreCardLogicList) {
        resultData.scoreCardLogicList = togetherData(resultData.scoreCardLogicList);
      }
      setModelResult(resultData);
    } else {
      message.error(res?.status?.desc || '异常');
    }
  };

  const exportPage = async () => {
    let params = {
      itmModelRegisCode: '',
    };
    setLoading(true);
    let res = await exportPageRequest(params);
    if (res?.status?.code == successCode) {
      setLoading(false);
      message.success(res?.status?.desc || '成功');
    } else {
      setLoading(false);
      message.error(res?.status?.desc || '异常');
    }
  };

  return (
    <div className={styles['step-page']}>
      <div className={styles['step-title']}>
        <span>生成报告</span>
        <TitleStatus index={10}></TitleStatus>
      </div>

      <Tabs type="card" size="large">
        <Tabs.TabPane tab="样本定义" key={'1'}>
          <SampleDefination sampleData={sampleData} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="入模变量" key={'2'}>
          <InputVariable modelResult={modelResult} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="评分卡" key={'3'}>
          <ScoreCard modelResult={modelResult} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="模型效果" key={'4'}>
          <ModelEffect modelResult={modelResult} />
        </Tabs.TabPane>
      </Tabs>
      <NextStepButton
        btnNode={
          <Space>
            <Button onClick={exportPage} size="large" type="primary" loading={loading}>
              生成报告
            </Button>
          </Space>
        }
      />
    </div>
  );
};

export default StepExportReport;
