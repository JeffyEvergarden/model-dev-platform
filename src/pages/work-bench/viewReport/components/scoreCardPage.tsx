import React, { Fragment, useEffect, useRef, useState } from 'react';
import ScoreCardTable from '@/pages/model-step/components/scoreCardTable';
import { useModel, history } from 'umi';
import { useComparePage } from '@/pages/model-step/pages/step-model-compare/model';
import { changeData } from '@/utils';

export default (props: any) => {
  const { optimalVersion } = props;
  const actionRef = useRef<any>();

  const { modelId } = useModel('step', (model: any) => ({
    modelId: model.modelId,
  }));

  const { scoreCardListReuqest } = useComparePage();

  const scoreCardList = async (payload: any) => {
    let params = {
      page: payload?.current,
      pageSize: payload?.pageSize,
      itmModelRegisCode: modelId,
      modelVersion: optimalVersion,
    };
    let res = await scoreCardListReuqest(params);
    let resultData = togetherData(res?.result?.tableData);
    return {
      data: resultData || [],
      total: res?.result?.totalSize || 0,
      current: payload?.current || 1,
      pageSize: payload?.pageSize || 10,
    };
  };

  const togetherData = (data: any) => {
    let tempArr: any = [];
    data?.map((item: any, index: any) => {
      item?.scoreItemList?.map((el: any) => {
        tempArr.push({
          idx: index,
          id: el?.variable,
          variable: item?.variable,
          variableName: item?.variableName,
          boxGroup: el?.boxGroup,
          score: el?.score,
          trainBadRate: el?.trainBadRate,
          validBadRate: el?.validBadRate,
          trainRate: el?.trainRate,
          validRate: el?.validRate,
        });
      });
    });
    return changeData(tempArr, 'variable');
  };

  return (
    <ScoreCardTable
      pageType="compareAndReport"
      headerTitle="评分卡-计算逻辑"
      rowKey={(record: any) => record.id}
      toolBarRender={() => []}
      actionRef={actionRef}
      requestMethod={scoreCardList}
    />
  );
};
