import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useModel } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import ModelTable from './table';

import style from './style.less';
import { useSummaryModel } from './model';

import allItem from '@/asset/image/allItem.png';
import incomplete from '@/asset/image/incomplete.png';
import complete from '@/asset/image/complete.png';

// 首页
const Myjob: React.FC = (props: any) => {
  // const { initialState, setInitialState } = useModel('@@initialState');
  const { allItemNum, incompleteNum, completeNum, getSummaryInfo } = useSummaryModel();
  const tableRef: any = useRef();

  useEffect(() => {
    getSummaryInfo();
  }, []);

  return (
    <PageContainer>
      <div className={`list-page`}>
        <div className={style['module-title']}>我的工作台</div>

        <div className={style['title-row']}>
          <div
            className={style['title-box']}
            onClick={() => {
              console.log(1);
              tableRef?.current?.setModelType?.(undefined);
            }}
          >
            <div className={style['contentBox']}>
              <img src={allItem} alt="全部事项" />
              <span className={style['content']}>全部事项</span>
            </div>

            <div className={style['number']}>{allItemNum ?? '-'}</div>
          </div>

          <div
            className={style['title-box']}
            onClick={() => {
              console.log(1);
              tableRef?.current?.setModelType?.('0');
            }}
          >
            <div className={style['contentBox']}>
              <img src={incomplete} alt="未完成事项" />
              <span className={style['content']}>未完成事项</span>
            </div>

            <div className={style['number']}>{incompleteNum ?? '-'}</div>
          </div>

          <div
            className={style['title-box']}
            onClick={() => {
              console.log(1);
              tableRef?.current?.setModelType?.('1');
            }}
          >
            <div className={style['contentBox']}>
              <img src={complete} alt="已完成事项" />
              <span className={style['content']}>已完成事项</span>
            </div>

            <div className={style['number']}>{completeNum ?? '-'}</div>
          </div>
        </div>

        <div className={style['module-title']} style={{ marginBottom: '8px' }}>
          我的模型
        </div>

        <ModelTable cref={tableRef} />
      </div>
    </PageContainer>
  );
};

export default Myjob;
