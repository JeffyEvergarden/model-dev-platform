import React, { Fragment, useEffect, useRef, useState } from 'react';
import ScoreCardTable from '@/pages/model-step/components/scoreCardTable';
import { changeData } from '@/utils';
import { useComparePage } from './../../step-model-compare/model';

export default (props: any) => {
  const { getScoreCardList } = useComparePage();

  const actionRef = useRef<any>();

  const scoreCardList = async (payload: any) => {
    let params = {};

    let res = await getScoreCardList(params);
    let tempArr: any = [];
    res?.data?.list?.map((item: any, index: any) => {
      item?.dividerList?.map((el: any) => {
        tempArr.push({
          idx: index,
          id: item.id + '-' + el.id,
          name: item?.name,
          nameZH: item?.nameZH,
          divider: el?.divider,
          score: el?.score,
          badRate: el?.badRate,
          trateRate: el?.trateRate,
          trateCurrentRate: el?.trateCurrentRate,
          verifyCurrentRate: el?.verifyCurrentRate,
        });
      });
    });
    changeData(tempArr, 'name');
    return {
      data: tempArr || [],
      total: res?.data?.total || 0,
      current: payload.current,
      pageSize: payload.pageSize,
    };
  };

  return (
    <ScoreCardTable
      pageType="compareAndReport"
      headerTitle={<span style={{ fontWeight: 700 }}>评分卡-计算逻辑</span>}
      rowKey={(record: any) => record.id}
      toolBarRender={() => []}
      actionRef={actionRef}
      request={async (params = {}) => {
        return scoreCardList(params);
      }}
    />
  );
};
