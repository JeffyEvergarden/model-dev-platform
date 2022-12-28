import React, { useEffect, useRef } from 'react';

import styles from '../style.less';
import MissingValueFilling from './missing-value-filling';

// 首页
const StepFeaturePrepare: React.FC<any> = (props: any) => {
  return (
    <div className={styles['step-page']}>
      <div className={styles['step-title']}>特征工程</div>

      <MissingValueFilling />
    </div>
  );
};

export default StepFeaturePrepare;
