import React, { useEffect, useRef, useMemo } from 'react';
import { useState } from 'react';
import { useModel, history } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { Steps } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import style from './style.less';
import {
  config as configMap,
  STEP_ITEM_LIST,
  formateStatus,
  codeToName,
  nameToCode,
  goToUrl,
} from './config';
import Condition from '@/components/Condition';
import { useBaseInfoModel } from './model';
import { isBoolean } from 'lodash';

const Step = Steps.Step;

// 首页
const Myjob: React.FC<any> = (props: any) => {
  // const { initialState, setInitialState } = useModel('@@initialState');
  const { children } = props;

  const {
    modelId,
    setModelId,
    doneStep,
    setDoneStep,
    doneStepStatus,
    setDoneStepStatus,
    curStep,
    setCurStep,
    isHadBuild,
    setIsHadBuild,
    isHadReported,
    setIsHadReported,
  } = useModel('step' as any, (model: any) => ({
    modelId: model.modelId,
    setModelId: model.setModelId,
    doneStep: model.doneStep,
    setDoneStep: model.setDoneStep,
    doneStepStatus: model.doneStepStatus,
    setDoneStepStatus: model.setDoneStepStatus,
    curStep: model.curStep,
    setCurStep: model.setCurStep,
    isHadBuild: model.isHadBuild,
    setIsHadBuild: model.setIsHadBuild,
    isHadReported: model.isHadReported,
    setIsHadReported: model.setIsHadReported,
  }));

  const { hasDone, getModelInfo, getModelDetail } = useBaseInfoModel();

  const [pageLoad, setPageLoad] = useState<boolean>(false);

  const query: any = history.location.query || {};

  const _modelId: any = query?.id;

  // 获取模型详情
  const _getInfo = async () => {
    let res = await getModelInfo(_modelId || modelId);

    if (typeof res === 'object') {
      // 设置全局状态
      let _index = Number(res.currentStage) || 1;
      setDoneStep(Number(_index));
      setDoneStepStatus(formateStatus(Number(res.currentStageStatus)));
      // 进行页面跳转
      setPageLoad(true);
      goToUrl(codeToName(_index), _modelId || modelId);
      setCurStep(_index - 1);
      // --------
      setIsHadBuild(typeof res.isModelBuild === 'boolean' ? res.isModelBuild : false);
      setIsHadReported(typeof res.reportFilePath === 'boolean' ? res.isModelBuild : false);
    } else {
      setDoneStep(1);
      setDoneStepStatus('process');
      goToUrl('model_overview', _modelId || modelId);
      setCurStep(0);
      setIsHadBuild(false);
      setIsHadReported(false);
    }
  };

  // 加载模型信息
  useEffect(() => {
    // 设置模型ID
    if (_modelId) {
      setModelId(_modelId);
      // 设置 location-href sessionStorage
      localStorage.setItem('dev-model-id', _modelId);
    }
    // 获取模型信息
    _getInfo();
  }, []);

  const onClickBreadcrumb = (route: any) => {
    history.push(route.path);
  };

  const modelMapToValue = (cur: number, fs: number, i: number, doneStepStatus: any) => {
    // 点击完成步骤之前的
    if (i <= fs) {
      // 选中菜单
      if (cur === i && fs === i) {
        return '进行中';
      }
      if (i === fs) {
        let status = formateStatus(doneStepStatus);
        if (status === 'error') {
          return '已失败';
        } else if (status === 'finish') {
          return '已完成';
        } else {
          return '未开始';
        }
      }
      return '已完成';
    } else if (i > fs) {
      return '未完成';
    }
  };

  // wait process finish error
  const modelMapToStatus = (cur: number, fs: number, i: number, doneStepStatus: any) => {
    // 点击完成步骤之前的
    if (i <= fs) {
      // 选中菜单
      if (cur === i) {
        return 'process';
      }
      if (i === fs) {
        let status = formateStatus(doneStepStatus);
        if (status === 'error') {
          return 'error';
        } else {
          return 'process';
        }
      }
      return 'finish';
    } else if (i > fs) {
      return 'wait';
    }
  };

  const _stepItems = useMemo(() => {
    return STEP_ITEM_LIST.map((item: any, i: number) => {
      let obj: any = {
        title: item.title,
        name: item.name,
        description: modelMapToValue(curStep, doneStep - 1, i, doneStepStatus),
        status: modelMapToStatus(curStep, doneStep - 1, i, doneStepStatus),
      };
      if (
        curStep === i &&
        doneStep - 1 === i &&
        (doneStepStatus === 'process' || doneStepStatus === 'wait')
      ) {
        obj.icon = <LoadingOutlined />;
      }
      return obj;
    });
  }, [curStep, doneStep, doneStepStatus]);

  // 切换步骤
  const onChange = (val: any) => {
    // val 输出的是数组序号
    // 获取数组对象
    let stepItem: any = STEP_ITEM_LIST[val];
    // 当前数字序号
    let index: any = nameToCode(stepItem.name);

    // 超过当前序号无效
    if (index > doneStep) {
      return;
    }
    // 设置当前显示步骤
    setCurStep(val + 1);
    // 跳转
    let key: any = stepItem?.name;
    if (configMap[key]) {
      history.push(configMap[key] + '?id=' + `${_modelId || modelId}`);
    }
  };

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
      <Condition r-if={modelId && pageLoad}>
        <div className={style['zy-row']}>
          <div className={style['left-content']}>
            <Steps direction="vertical" current={curStep} onChange={onChange}>
              {_stepItems.map((item: any, index: number) => {
                return <Step key={item.name} {...item} />;
              })}
            </Steps>
          </div>

          <div className={style['right-content']}>{children}</div>
        </div>
      </Condition>
    </PageContainer>
  );
};

export default Myjob;
