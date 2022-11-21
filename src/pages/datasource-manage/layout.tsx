import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { history, useModel } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import DataSourceTable from './';

// 首页
const Myjob: React.FC = (props: any) => {
  // const { initialState, setInitialState } = useModel('@@initialState');

  useEffect(() => {}, []);

  const onClickBreadcrumb = (route: any) => {
    history.push(route.path);
  };

  return (
    <PageContainer
      header={{
        title: '数据源管理',
        ghost: true,
        breadcrumb: {
          itemRender: (route: any, params: any, routes: any, paths: any[]) => {
            return (
              <span
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  onClickBreadcrumb(route);
                }}
              >
                {route.breadcrumbName}
              </span>
            );
          },
          routes: [
            {
              path: '/datasource/management',
              breadcrumbName: '数据源管理',
            },
          ],
        },
      }}
    >
      <DataSourceTable />
    </PageContainer>
  );
};

export default Myjob;
