import React, { useEffect, useRef, useState } from 'react';
import { Form, Input, DatePicker, Button, Tag } from 'antd';
import { useModel } from 'umi';
import styles from './style.less';
import Condition from '@/components/Condition';

// 首页
const TitleStatus: React.FC<any> = (props: any) => {
  const { curStep, doneStep, doneStepStatus } = useModel('step', (model: any) => ({
    curStep: model.curStep,
    doneStep: model.doneStep,
    doneStepStatus: model.doneStepStatus,
  }));

  const { index } = props;

  return (
    <div className={styles['step-title_icon']}>
      <Condition r-if={index <= doneStep}>
        <Condition r-if={index !== doneStep}>
          <Tag color="success">已完成</Tag>
        </Condition>
        <Condition r-if={index === doneStep}>
          {doneStepStatus === 'error' && <Tag color="error">处理失败</Tag>}
          {doneStepStatus === 'finish' && <Tag color="success">已完成</Tag>}
          {doneStepStatus !== 'error' && doneStepStatus !== 'finish' && (
            <Tag color="processing">进行中</Tag>
          )}
        </Condition>
      </Condition>
      {/* 未完成 */}
      <Condition r-if={index > doneStep}>
        <Tag color="default">未开始</Tag>
      </Condition>
    </div>
  );
};

export default TitleStatus;
