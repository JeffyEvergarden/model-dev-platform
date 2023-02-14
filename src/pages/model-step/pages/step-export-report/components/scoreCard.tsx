import React, { Fragment, useEffect, useRef, useState } from 'react';
import ScoreCardTable from '@/pages/model-step/components/scoreCardTable';

export default (props: any) => {
  const { modelResult } = props;

  const actionRef = useRef<any>();

  return (
    <ScoreCardTable
      pageType="compareAndReport"
      headerTitle={<span style={{ fontWeight: 700 }}>评分卡-计算逻辑</span>}
      rowKey={(record: any) => record.id}
      toolBarRender={() => []}
      actionRef={actionRef}
      dataSource={modelResult?.scoreCardLogicList}
    />
  );
};
