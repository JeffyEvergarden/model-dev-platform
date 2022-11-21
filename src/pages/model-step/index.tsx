import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useModel, history } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { Steps } from 'antd';
import style from './style.less';
import { config as configMap } from './config';

const Step = Steps.Step;

const modelMapToValue = (cur: number, fs: number, i: number) => {
  if (fs >= i) {
    return '已完成';
  } else if (cur === fs + 1 && i === fs + 1) {
    return '进行中';
  } else if (fs < i) {
    return '未完成';
  }
};

const modelMapToStatus = (cur: number, fs: number, i: number) => {
  if (i <= fs) {
    return 'process';
  } else if (cur === fs + 1 && i === fs + 1) {
    return 'process';
  } else {
    return 'wait';
  }
};

// 首页
const Myjob: React.FC = (props: any) => {
  // const { initialState, setInitialState } = useModel('@@initialState');
  const { children } = props;

  const [modelStep, setModelStep] = useState<number>(0);

  const [finishStep, setFinishStep] = useState<number>(3);

  useEffect(() => {}, []);

  const onClickBreadcrumb = (route: any) => {
    history.push(route.path);
  };

  const onChange = (val: any) => {
    console.log(val);
    if (val > finishStep + 1) {
      return;
    }
    setModelStep(val);
    // 跳转
    if (configMap[val]) {
      history.push(configMap[val]);
    }
  };

  const stepItems = [
    {
      title: '模型概况',
      description: modelMapToValue(modelStep, finishStep, 0),
      status: modelMapToStatus(modelStep, finishStep, 0),
    },
    {
      title: '样本选取',
      description: modelMapToValue(modelStep, finishStep, 1),
      status: modelMapToStatus(modelStep, finishStep, 1),
    },
    {
      title: '策略回溯',
      description: modelMapToValue(modelStep, finishStep, 2),
      status: modelMapToStatus(modelStep, finishStep, 2),
    },
    {
      title: '前期分析',
      description: modelMapToValue(modelStep, finishStep, 3),
      status: modelMapToStatus(modelStep, finishStep, 3),
    },
    {
      title: '样本定义',
      description: modelMapToValue(modelStep, finishStep, 4),
      status: modelMapToStatus(modelStep, finishStep, 4),
    },
    {
      title: '特征工程',
      description: modelMapToValue(modelStep, finishStep, 5),
      status: modelMapToStatus(modelStep, finishStep, 5),
    },
    {
      title: '模型构建',
      description: modelMapToValue(modelStep, finishStep, 6),
      status: modelMapToStatus(modelStep, finishStep, 6),
    },
    {
      title: '模型对比',
      description: modelMapToValue(modelStep, finishStep, 7),
      status: modelMapToStatus(modelStep, finishStep, 7),
    },
    {
      title: '生成报告',
      description: modelMapToValue(modelStep, finishStep, 8),
      status: modelMapToStatus(modelStep, finishStep, 8),
    },
  ];

  return (
    <PageContainer
      header={{
        title: '自由高达',
        ghost: true,
        breadcrumb: {
          itemRender: (route: any, params: any, routes: any, paths: any[]) => {
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
              path: '/myjob',
              breadcrumbName: '我的工作台',
            },
            {
              path: '/modelStep',
              breadcrumbName: '模型详情',
            },
          ],
        },
      }}
    >
      <div className={style['zy-row']}>
        <div className={style['left-content']}>
          <Steps direction="vertical" current={modelStep} onChange={onChange}>
            {stepItems.map((item: any, index: number) => {
              return <Step key={index} {...item} />;
            })}
          </Steps>
        </div>

        <div className={style['right-content']}>{children}</div>
      </div>
    </PageContainer>
  );
};

export default Myjob;
