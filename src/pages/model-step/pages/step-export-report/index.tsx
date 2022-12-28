import React, { useState, useEffect, useRef } from 'react';
import { Tabs } from 'antd';
import styles from '../style.less';
import SampleDefination from './components/sampleDefination';

const StepExportReport: React.FC<any> = (props: any) => {
  return (
    <div className={styles['step-page']}>
      <div className={styles['step-title']}>生成报告</div>
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
            children: `Content of Tab Pane 2`,
          },
          {
            label: `评分卡`,
            key: '3',
            children: `Content of Tab Pane 3`,
          },
          {
            label: `模型效果`,
            key: '4',
            children: `Content of Tab Pane 4`,
          },
        ]}
      />
    </div>
  );
};

export default StepExportReport;
