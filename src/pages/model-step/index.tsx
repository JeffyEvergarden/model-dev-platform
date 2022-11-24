import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useModel, history } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { Steps } from 'antd';
import style from './style.less';
import { config as configMap, STEP_ITEM_LIST } from './config';

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

  const [finishStep, setFinishStep] = useState<number>(9);

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
    let key: any = STEP_ITEM_LIST[val]?.name;
    console.log(key);
    if (configMap[key]) {
      history.push(configMap[key]);
    }
  };

  const _stepItems = STEP_ITEM_LIST.map((item: any, i: number) => {
    return {
      title: item.title,
      description: modelMapToValue(modelStep, finishStep, i),
      status: modelMapToStatus(modelStep, finishStep, i),
    };
  });

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
      <div className={style['zy-row']} key={modelStep}>
        <div className={style['left-content']}>
          <Steps direction="vertical" current={modelStep} onChange={onChange}>
            {_stepItems.map((item: any, index: number) => {
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
