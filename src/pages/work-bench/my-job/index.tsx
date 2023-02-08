import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useModel } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import ModelTable from './table';

import AllImage from './img/all.png';
import FailImage from './img/fail.png';
import FinishImage from './img/finish.png';

import style from './style.less';
import { useSummaryModel } from './model';

import allItem from '@/asset/image/allItem.png';
import incomplete from '@/asset/image/incomplete.png';
import complete from '@/asset/image/complete.png';

// 首页
const Myjob: React.FC = (props: any) => {
  const [activeTabs, setActiveTabs] = useState<number>(1);

  // const { initialState, setInitialState } = useModel('@@initialState');
  const { allItemNum, incompleteNum, completeNum, getSummaryInfo } = useSummaryModel();
  const tableRef: any = useRef();

  const onTabClick = (it: any) => {
    if (activeTabs === it) {
      setActiveTabs(0);
    } else {
      setActiveTabs(it);
    }
  };

  useEffect(() => {
    getSummaryInfo();
  }, []);

  return (
    <PageContainer>
      <div className={`list-page`}>
        <div className={style['module-title']}>我的工作台</div>

        <div className={style['title-row']}>
          <div
            className={`${style['title-box']} ${activeTabs === 1 ? style['tabs-active'] : ''}`}
            onClick={() => {
              onTabClick(1);
              tableRef?.current?.setModelType?.(undefined);
            }}
          >
            <div className={`${style['zy-row']}`}>
              <img className={style['img']} src={AllImage} />
              <div className={style['content']}>全部事项</div>
            </div>

            <div className={style['number']}>{allItemNum ?? '-'}</div>
          </div>

          <div
            className={`${style['title-box']} ${activeTabs === 2 ? style['tabs-active'] : ''}`}
            onClick={() => {
              onTabClick(2);
              tableRef?.current?.setModelType?.('0');
            }}
          >
            <div className={style['zy-row']}>
              <img className={style['img']} src={FailImage} />
              <div className={style['content']}>未完成事项</div>
            </div>
            <div className={style['number']}>{incompleteNum ?? '-'}</div>
          </div>

          <div
            className={`${style['title-box']} ${activeTabs === 3 ? style['tabs-active'] : ''}`}
            onClick={() => {
              onTabClick(3);
              tableRef?.current?.setModelType?.('1');
            }}
          >
            <div className={style['zy-row']}>
              <img className={style['img']} src={FinishImage} />
              <div className={style['content']}>已完成事项</div>
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
