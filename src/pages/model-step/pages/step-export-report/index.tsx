import React, { useState, useEffect, useRef } from 'react';
import { Tabs, Tag, Space, Button, message } from 'antd';
import styles from '../style.less';
import SampleDefination from './components/sampleDefination';
import InputVariable from './components/InputVariable';
import ScoreCard from './components/scoreCard';
import ModelEffect from './components/modelEffect';
import NextStepButton from '../../components/nextstep-button';

const StepExportReport: React.FC<any> = (props: any) => {
  const exportPage = () => {
    message.success('已生成报告');
  };
  return (
    <div className={styles['step-page']}>
      <div className={styles['step-title']}>
        生成报告<Tag color={'processing'}>进行中</Tag>
      </div>
      <Tabs
        type="card"
        size="large"
        items={[
          {
            label: `样本定义`,
            key: '1',
            children: <SampleDefination />,
          },
          {
            label: `入模变量`,
            key: '2',
            children: <InputVariable />,
          },
          {
            label: `评分卡`,
            key: '3',
            children: <ScoreCard />,
          },
          {
            label: `模型效果`,
            key: '4',
            children: <ModelEffect />,
          },
        ]}
      />
      <NextStepButton
        btnNode={
          <Space>
            <Button onClick={exportPage} size="large" type="primary">
              生成报告
            </Button>
          </Space>
        }
      />
    </div>
  );
};

export default StepExportReport;
