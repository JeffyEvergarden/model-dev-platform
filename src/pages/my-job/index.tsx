import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useModel } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import ModelTable from './table';

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
          <div className={style['title-box']}>
            <div className={style['content']}>全部事项</div>

            <div className={style['number']}>10</div>
          </div>

          <div className={style['title-box']}>
            <div className={style['content']}>未完成事项</div>

            <div className={style['number']}>3</div>
          </div>

          <div className={style['title-box']}>
            <div className={style['content']}>已完成事项</div>

            <div className={style['number']}>7</div>
          </div>
        </div>

        <div className={style['module-title']} style={{ marginBottom: '8px' }}>
          我的模型
        </div>

        <ModelTable />
      </div>
    </PageContainer>
  );
};

export default Myjob;
