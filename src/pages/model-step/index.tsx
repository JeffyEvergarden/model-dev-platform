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
import { isBoolean, isNumber } from 'lodash';
import user from 'mock/user';

const Step = Steps.Step;

// 首页
const Myjob: React.FC<any> = (props: any) => {
  // const { initialState, setInitialState } = useModel('@@initialState');
  const { children } = props;

  const {
    modelId,
    setModelId,
    modelName,
    setModelName,
    doneStep,
    setDoneStep,
    doneStepStatus,
    setDoneStepStatus,
    curStep,
    setCurStep,
    isHadBuild,
    setIsHadBuild,
    currentStep,
    isHadReported,
    setIsHadReported,
    setOperate,
  } = useModel('step' as any, (model: any) => ({
    modelId: model.modelId,
    setModelId: model.setModelId,
    modelName: model.modelName,
    setModelName: model.setModelName,
    doneStep: model.doneStep,
    setDoneStep: model.setDoneStep,
    doneStepStatus: model.doneStepStatus,
    setDoneStepStatus: model.setDoneStepStatus,
    curStep: model.curStep,
    setCurStep: model.setCurStep,
    currentStep: model.currentStep,
    isHadBuild: model.isHadBuild,
    setIsHadBuild: model.setIsHadBuild,
    isHadReported: model.isHadReported,
    setIsHadReported: model.setIsHadReported,
    setOperate: model.setOperate,
  }));

  const { hasDone, getModelInfo, getModelDetail } = useBaseInfoModel();

  const [pageLoad, setPageLoad] = useState<boolean>(false);

  const rightContentRef: any = useRef<any>();

  const query: any = history.location.query || {};

  const _modelId: any = query?.id;

  // 获取模型详情
  const _getInfo = async () => {
    let res = await getModelInfo(_modelId || modelId);
    if (res?.modelName) {
      setModelName(res?.modelName);
    }

    if (typeof res === 'object') {
      // 设置全局状态
      let _index = Number(res.currentStage) || 1;
      let _status = formateStatus(Number(res.currentStageStatus));
      setDoneStep(Number(_index));
      setDoneStepStatus(_status);
      // 进行页面跳转
      setPageLoad(true);
      goToUrl(codeToName(_index), _modelId || modelId);
      setCurStep(_index - 1);
      // --------
      setIsHadBuild(res.modelBuildStatus === '1');
      // 步骤大于10 且 已完成
      setIsHadReported(_index >= 10 && _status === 'finish');
      //是否有编辑权限
      // setOperate(res?.operate);
      setOperate('EDIT'); //暂时先开启
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
    let status: any = formateStatus(doneStepStatus);
    if (!isNaN(status)) {
      status = formateStatus(status);
    }
    if (i <= fs) {
      // 选中菜单
      if (cur === i && fs === i) {
        return '进行中';
      }
      if (i === fs) {
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
    } else {
      return `状态设置错误: ${i} - ${fs}
      ${doneStepStatus} - ${status}`;
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
        let status: any = formateStatus(doneStepStatus);
        if (!isNaN(status)) {
          status = formateStatus(status);
        }
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
    setCurStep(val);
    // currentStep.current.currentStep = val + 1
    // 跳转
    let key: any = stepItem?.name;
    if (configMap[key]) {
      setTimeout(() => {
        history.push(configMap[key] + '?id=' + `${_modelId || modelId}`);
        console.log(rightContentRef.current);
        if (rightContentRef.current) {
          rightContentRef.current.scrollTop = 0;
        }
      }, 300);
    }
  };

  return (
    <PageContainer
      header={{
        title: modelName,
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
              path: '/workBench/moy-job',
              breadcrumbName: '我的工作台',
            },
            {
              path: `/workBench/exportReport?id=${modelId}`,
              breadcrumbName: '模型详情',
            },
          ],
        },
      }}
    >
      <Condition r-if={modelId && pageLoad}>
        <div className={style['zy-row']} ref={rightContentRef}>
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
