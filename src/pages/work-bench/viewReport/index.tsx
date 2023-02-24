import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { history } from 'umi';
import { Tabs, message } from 'antd';
import styles from './index.less';
import ModelBasic from './components/modelBasic';
import PreAnalysis from './components/preAnalysis';
import DefineSample from './components/defineSample';
import InputVariable from '@/pages/model-step/pages/step-export-report/components/InputVariable';
import ScoreCardPage from './components/scoreCardPage';
import CompareAndReportCommonPage from '@/pages/model-step/components/compareAndReportCommonPage';
import { getStepOneForm } from '@/pages/model-step/pages/step-model-overview/model/api';
import { useExportReportModel } from './../../model-step/pages/step-export-report/model';
import { useComparePage } from './../../model-step/pages/step-model-compare/model';
import { changeData } from '@/utils';

import config from '@/config';
const successCode = config.successCode;

export default () => {
  const { getSampleDefineDetail } = useExportReportModel();
  const { getModelResultRequest } = useComparePage();

  const [modelDetail, setModelDetail] = useState<any>({});
  const [sampleData, setSampleData] = useState<any>([]);
  const [modelResult, setModelResult] = useState<any>({});

  const onClickBreadcrumb = (route: any) => {
    history.push(route.path);
  };

  useEffect(() => {
    // getSummaryDetail(); //模型概况
    // getSampleData(); //样本定义
    // getModelResult(); //入魔变量、评分卡、模型效果
  }, []);

  const getSummaryDetail = async () => {
    let params = { itmModelRegisCode: '' };
    let res = await getStepOneForm(params);
    if (res?.status?.code === successCode) {
      setModelDetail(res?.result);
    }
  };

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
    if (res?.result?.otherValidList) {
      res.result.otherValidList = res.result.otherValidList.join(',');
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

  return (
    <div className={styles.model_report_detail}>
      <PageContainer
        header={{
          title: '模型名称',
          ghost: true,
          breadcrumb: {
            itemRender: (route: any, params: any, router: any, paths: any[]) => {
              return (
                <span
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    onClickBreadcrumb(route);
                  }}
                >
                  {route.breadcrumbName}
                </span>
              );
            },
            routes: [
              {
                path: '/workBench/moy-job',
                breadcrumbName: '我的工作台',
              },
              {
                path: '/workBench/viewReport',
                breadcrumbName: '模型报告详情',
              },
            ],
          },
        }}
      >
        <Tabs size="large">
          <Tabs.TabPane tab={'模型概况'} key={'1'}>
            <ModelBasic modelDetail={modelDetail} />
          </Tabs.TabPane>
          <Tabs.TabPane tab={'前期分析'} key={'2'}>
            <PreAnalysis />
          </Tabs.TabPane>
          <Tabs.TabPane tab={'样本定义'} key={'3'}>
            <DefineSample sampleData={sampleData} />
          </Tabs.TabPane>
          <Tabs.TabPane tab={'入模变量'} key={'4'}>
            <InputVariable modelResult={modelResult} />
          </Tabs.TabPane>
          <Tabs.TabPane tab={'评分卡'} key={'5'}>
            <ScoreCardPage modelResult={modelResult} />
          </Tabs.TabPane>
          <Tabs.TabPane tab={'模型效果'} key={'6'}>
            <CompareAndReportCommonPage pageType={'modelEffect'} modelResult={modelResult} />
          </Tabs.TabPane>
        </Tabs>
      </PageContainer>
    </div>
  );
};
