import { useState } from 'react';

export default function useStepModel() {
  // 模型ID
  const [modelId, setModelId] = useState<any>(null);

  // 当前已完成步骤
  const [doneStep, setDoneStep] = useState<any>(0);

  // 当前已完成步骤状态
  const [doneStepStatus, setDoneStepStatus] = useState<any>(null);

  // 当前所选步骤
  const [curStep, setCurStep] = useState<any>(null);

  const nextStep = () => {};

  return {
    modelId,
    setModelId,
    doneStep,
    setDoneStep,
    doneStepStatus,
    setDoneStepStatus,
  };
}
