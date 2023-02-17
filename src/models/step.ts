import { useState } from 'react';

export default function useStepModel() {
  // 模型ID
  const [modelId, setModelId] = useState<any>(localStorage.getItem('dev-model-id') || '');

  // 当前已完成步骤
  const [doneStep, setDoneStep] = useState<any>(0); //  1-10

  // 当前已完成步骤状态
  const [doneStepStatus, setDoneStepStatus] = useState<any>(null);

  // 当前所选步骤
  const [curStep, setCurStep] = useState<any>(0); // 0~9

  // 是否已经构建过 // 构建过 前三个步骤 都不能再编辑
  const [isHadBuild, setIsHadBuild] = useState<any>(false);

  // 是否已经生成报告 // 生成报告后 都不能再编辑
  const [isHadReported, setIsHadReported] = useState<any>(false);

  return {
    modelId,
    setModelId,
    curStep,
    setCurStep,
    doneStep,
    setDoneStep,
    doneStepStatus,
    setDoneStepStatus,
    isHadBuild,
    setIsHadBuild,
    isHadReported,
    setIsHadReported,
  };
}
