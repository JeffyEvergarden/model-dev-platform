import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useModel } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import style from './style.less';

// 首页
const ModelReport: React.FC = (props: any) => {
  // const { initialState, setInitialState } = useModel('@@initialState');

  const [activeKey, setActiveKey] = useState('0');

  const initItems: any[] = [
    {
      label: '模型概况',
      key: 'model-overview',
      children: 'model-overview',
    },
    {
      label: '样本选取',
      key: 'model-overview',
      children: 'model-overview',
    },
    {
      label: '模型概况',
      key: 'model-overview',
      children: 'model-overview',
    },
    {
      label: '模型概况',
      key: 'model-overview',
      children: 'model-overview',
    },
    {
      label: '模型概况',
      key: 'model-overview',
      children: 'model-overview',
    },
  ];

  useEffect(() => {}, []);

  return (
    <PageContainer>
      <div className={`list-page`}>
        <div className={style['module-title']}>模型报告</div>
      </div>
    </PageContainer>
  );
};

export default ModelReport;
