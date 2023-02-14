import { Divider } from 'antd';
import React, { useEffect, useRef } from 'react';

import styles from '../style.less';
import MissingValueFilling from './missing-value-filling';
import VariableSubBox from './variable-sub-box';
import TitleStatus from '../../components/title-status';

// 首页
const StepFeaturePrepare: React.FC<any> = (props: any) => {
  return (
    <div className={styles['step-page']}>
      <div className={styles['step-title']}>
        <span>特征工程</span>
        <TitleStatus index={7}></TitleStatus>
      </div>

      <MissingValueFilling />
      <Divider></Divider>
      <VariableSubBox />
    </div>
  );
};

export default StepFeaturePrepare;
