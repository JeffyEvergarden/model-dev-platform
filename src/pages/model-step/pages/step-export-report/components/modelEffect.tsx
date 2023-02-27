import React, { useState, useEffect, useRef } from 'react';
import CompareAndReportCommonPage from '@/pages/model-step/components/compareAndReportCommonPage';

export default (props: any) => {
  const { modelResult, optimalVersion } = props;
  return (
    <div>
      <CompareAndReportCommonPage
        pageType="modelEffect"
        modelResult={modelResult}
        optimalVersion={optimalVersion}
      />
    </div>
  );
};
