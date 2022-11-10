import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useModel } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';

import style from './style.less';

// 首页
const Myjob: React.FC = (props: any) => {
  // const { initialState, setInitialState } = useModel('@@initialState');

  useEffect(() => {}, []);

  return (
    <PageContainer>
      <div className={`list-page`}>
        <div className={style['module-title']}>我的工作台</div>

        <div className={style['title-row']}>
          <div className={style['title-box']}></div>
        </div>
      </div>
    </PageContainer>
  );
};

export default Myjob;
