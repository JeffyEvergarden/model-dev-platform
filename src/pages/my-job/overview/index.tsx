import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useModel } from 'umi';
import style from './style.less';

// 首页
const OverviewHome: React.FC = (props: any) => {
  // const { initialState, setInitialState } = useModel('@@initialState');

  useEffect(() => {}, []);

  return <div className={style['image-bg']}>模型概况</div>;
};

export default OverviewHome;
