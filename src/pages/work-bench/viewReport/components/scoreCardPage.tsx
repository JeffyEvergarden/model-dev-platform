import React, { Fragment, useEffect, useRef, useState } from 'react';
import ScoreCardTable from '@/pages/model-step/components/scoreCardTable';

export default (props: any) => {
  const { modelResult } = props;
  const actionRef = useRef<any>();

  return (
    <ScoreCardTable
      pageType="compareAndReport"
      headerTitle="评分卡-计算逻辑"
      rowKey={(record: any) => record.id}
      toolBarRender={() => []}
      actionRef={actionRef}
      dataSource={modelResult?.scoreCardLogicList}
    />
  );
};
