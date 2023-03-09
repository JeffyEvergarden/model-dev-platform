import { useState, useRef, useMemo } from 'react';
import { useModel } from 'umi';

export default function useStepModel() {
  // 模型ID
  const [modelId, setModelId] = useState<any>(localStorage.getItem('dev-model-id') || '');
  const [modelName, setModelName] = useState<any>('');

  // 当前已完成步骤
  const [doneStep, _setDoneStep] = useState<any>(0); //  1-10

  const setDoneStep = (val: any) => {
    _setDoneStep(Number(val));
  };

  // 当前已完成步骤状态
  const [doneStepStatus, setDoneStepStatus] = useState<any>(null);

  // 当前所选步骤
  const [curStep, setCurStep] = useState<any>(0); // 0~9

  // 是否已经构建过 // 构建过 样本选取和策略回溯 都不能再编辑  1 是构建过, 0未构建过
  const [isHadBuild, setIsHadBuild] = useState<boolean>(false);

  // 是否已经生成报告 // 生成报告后 都不能再编辑 报告路径不为空【1】的时候所有步骤都不能编辑
  const [isHadReported, setIsHadReported] = useState<boolean>(false);

  //是否管理员
  const { initialState } = useModel('@@initialState');

  const { userAuth = [] }: any = initialState || {};
  // 当前用户是否有权限修改
  const [operate, setOperate] = useState<any>(''); // EDIT编辑   SCAN只读

  const isReadonly = useMemo(() => {
    if (operate == 'SCAN') {
      return true;
    } else if (operate == 'EDIT') {
      return false;
    } else {
      return false;
    }
  }, [operate]);

  //模型详情-步骤条当前点击的步骤
  let currentStep: any = useRef();

  return {
    modelId,
    setModelId,
    curStep,
    currentStep,
    setCurStep,
    doneStep,
    setDoneStep,
    doneStepStatus,
    setDoneStepStatus,
    isHadBuild,
    setIsHadBuild,
    isHadReported,
    setIsHadReported,
    modelName,
    setModelName,
    isLeaderDisabled: userAuth?.includes('RISK_MANAGER'),
    operate,
    setOperate,
    isReadonly,
  };
}
