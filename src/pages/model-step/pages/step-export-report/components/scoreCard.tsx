import React, { Fragment, useEffect, useRef, useState } from 'react';
import ScoreCardTable from '@/pages/model-step/components/scoreCardTable';
import { useModel, history } from 'umi';
import { useComparePage } from '@/pages/model-step/pages/step-model-compare/model';
import { changeData } from '@/utils';

export default (props: any) => {
  const { optimalVersion } = props;

  const actionRef = useRef<any>();
  const tableRef = useRef<any>({});

  const [originTableList, setOriginTableList] = useState<any>([]);

  useEffect(() => {
    scoreCardList();
  }, []);

  const { modelId } = useModel('step', (model: any) => ({
    modelId: model.modelId,
  }));

  const { scoreCardListReuqest } = useComparePage();

  //评分卡
  const scoreCardList = async () => {
    let params = {
      page: tableRef?.current?.page,
      pageSize: tableRef?.current?.pageSize,
      itmModelRegisCode: modelId,
      modelVersion: optimalVersion,
    };
    let res = await scoreCardListReuqest(params);
    setOriginTableList(res?.result?.tableData);
    tableRef?.current?.setTotal(res?.result?.totalSize);
    // return {
    //   data: resultData || [],
    //   total: res?.result?.totalSize || 0,
    //   current: payload?.current || 1,
    //   pageSize: payload?.pageSize || 10,
    // };
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
      headerTitle={<span style={{ fontWeight: 700 }}>评分卡-计算逻辑</span>}
      rowKey={(record: any) => record.id}
      toolBarRender={() => []}
      actionRef={actionRef}
      originTableList={originTableList}
      cref={tableRef}
      activeKey={optimalVersion}
    />
  );
};
