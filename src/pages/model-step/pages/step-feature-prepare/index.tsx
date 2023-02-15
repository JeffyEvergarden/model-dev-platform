import React, { useEffect, useRef, useState } from 'react';
import styles from '../style.less';
import Condition from '@/components/Condition';
import SelectModal from './tab-one';
import TabTwo from './tab-two';
import TitleStatus from '../../components/title-status';

// 首页
const StepFeaturePrepare: React.FC<any> = (props: any) => {
  const [tabType, setTabType] = useState<any>(1); // 导入数据类型 0、1  // 0 -> 是， 1 -> 否

  const [stepType, setStepType] = useState<any>(1); //  1、2  //  1-> 选择条件    2--> 导入进度

  // 过程id
  const [processId, setProcessId] = useState<any>('000');

  const onNext = () => {
    setStepType(2);
  };
  return (
    <div className={styles['step-page']}>
      <div className={styles['step-box']}>
        <div className={styles['step-title']}>
          <span>特征准备</span>
          <TitleStatus index={6}></TitleStatus>
        </div>
      </div>

      <Condition r-if={stepType === 1}>
        <SelectModal onNext={onNext}></SelectModal>
      </Condition>

      <Condition r-if={stepType === 2}>
        <TabTwo tabType={tabType} processId={processId}></TabTwo>
      </Condition>
    </div>
  );
};

export default StepFeaturePrepare;
