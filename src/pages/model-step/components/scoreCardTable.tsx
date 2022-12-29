import React, { Fragment, useEffect, useState } from 'react';
import { ProTable } from '@ant-design/pro-components';
import { Progress } from 'antd';
import styles from './style.less';
import classnames from 'classnames';

export default (props: any) => {
  const { pageType, headerTitle, rowKey, toolBarRender, actionRef, request } = props;

  const columnsScoreCard: any = [
    {
      title: '变量名称',
      dataIndex: 'name',
      render: (t: any, r: any, i: any) => {
        return {
          children: <span className={styles.cellSty}>{r.name}</span>,
          props: {
            rowSpan: r.namerowSpan,
          },
        };
      },
    },
    {
      title: '中文含义',
      dataIndex: 'nameZH',
      render: (t: any, r: any, i: any) => {
        return {
          children: <span className={styles.cellSty}>{r.nameZH}</span>,
          props: {
            rowSpan: r.namerowSpan,
          },
        };
      },
    },
    {
      title: '变量类型',
      dataIndex: 'nameZH1',
      hideInTable: pageType == 'compareAndReport',
      filters: [
        {
          text: '数值型',
          value: '数值型',
        },
        {
          text: '类别型',
          value: '类别型',
        },
        {
          text: '类别型(日期)',
          value: '类别型(日期)',
        },
      ],
      render: (t: any, r: any, i: any) => {
        return {
          children: <span className={styles.cellSty}>{r.nameZH}</span>,
          props: {
            rowSpan: r.namerowSpan,
          },
        };
      },
    },
    {
      title: '分箱',
      dataIndex: 'divider',
      render: (t: any, r: any, i: any) => {
        return <span className={styles.cellSty}>{r.divider}</span>;
      },
    },
    {
      title: '分数',
      dataIndex: 'score',
      render: (t: any, r: any, i: any) => {
        return <span className={styles.cellSty}>{r.score}</span>;
      },
    },
    {
      title: '训练坏比率',
      dataIndex: 'badRate',
      render: (t: any, r: any, i: any) => {
        let temp = r?.badRate?.replace('%', '');
        let idxNum = (r.idx + 1) % 2 == 0 ? 'even' : 'odd';
        return (
          <div
            className={classnames(
              styles.progressBox,
              idxNum === 'even' ? styles.progressBox_even : styles.progressBox_odd,
            )}
          >
            <Progress percent={Number(temp)} showInfo={false} trailColor="#fff" />
            <span className={styles.progressPercent}>{t}</span>
          </div>
        );
      },
    },
    {
      title: '验证坏比率',
      dataIndex: 'trateRate',
      render: (t: any, r: any, i: any) => {
        let temp = r?.trateRate?.replace('%', '');
        let idxNum = (r.idx + 1) % 2 == 0 ? 'even' : 'odd';
        return (
          <div
            className={classnames(
              styles.progressBox,
              idxNum === 'even' ? styles.progressBox_even : styles.progressBox_odd,
            )}
          >
            <Progress percent={Number(temp)} showInfo={false} trailColor="#fff" />
            <span className={styles.progressPercent}>{t}</span>
          </div>
        );
      },
    },
    {
      title: '训练该箱占比',
      dataIndex: 'trateCurrentRate',
      render: (t: any, r: any, i: any) => {
        let temp = r?.trateCurrentRate?.replace('%', '');
        let idxNum = (r.idx + 1) % 2 == 0 ? 'even' : 'odd';
        return (
          <div
            className={classnames(
              styles.progressBox,
              idxNum === 'even' ? styles.progressBox_even : styles.progressBox_odd,
            )}
          >
            <Progress percent={Number(temp)} showInfo={false} trailColor="#fff" />
            <span className={styles.progressPercent}>{t}</span>
          </div>
        );
      },
    },
    {
      title: '验证该箱占比',
      dataIndex: 'verifyCurrentRate',
      render: (t: any, r: any, i: any) => {
        let temp = r?.verifyCurrentRate?.replace('%', '');
        let idxNum = (r.idx + 1) % 2 == 0 ? 'even' : 'odd';
        return (
          <div
            className={classnames(
              styles.progressBox,
              idxNum === 'even' ? styles.progressBox_even : styles.progressBox_odd,
            )}
          >
            <Progress percent={Number(temp)} showInfo={false} trailColor="#fff" />
            <span className={styles.progressPercent}>{t}</span>
          </div>
        );
      },
    },
    {
      title: '训练ks_max',
      dataIndex: 'divider1',
      hideInTable: pageType == 'compareAndReport',
      render: (t: any, r: any, i: any) => {
        return <span className={styles.cellSty}>{r.divider}</span>;
      },
    },
    {
      title: '训练iv_sum',
      dataIndex: 'divider2',
      hideInTable: pageType == 'compareAndReport',
      render: (t: any, r: any, i: any) => {
        return <span className={styles.cellSty}>{r.divider}</span>;
      },
    },
    {
      title: '验证ks_max',
      dataIndex: 'divider3',
      hideInTable: pageType == 'compareAndReport',
      render: (t: any, r: any, i: any) => {
        return <span className={styles.cellSty}>{r.divider}</span>;
      },
    },
    {
      title: '验证iv_sum',
      dataIndex: 'divider4',
      hideInTable: pageType == 'compareAndReport',
      render: (t: any, r: any, i: any) => {
        return <span className={styles.cellSty}>{r.divider}</span>;
      },
    },
    {
      title: 'psi_sum',
      dataIndex: 'divider5',
      hideInTable: pageType == 'compareAndReport',
      render: (t: any, r: any, i: any) => {
        return <span className={styles.cellSty}>{r.divider}</span>;
      },
    },
  ];
  return (
    <div className={classnames(styles.relateTable, styles.TableCommonSty)}>
      <ProTable
        headerTitle={headerTitle}
        rowKey={rowKey}
        toolBarRender={toolBarRender}
        options={false}
        bordered
        actionRef={actionRef}
        pagination={{
          pageSize: 10,
        }}
        scroll={{ x: columnsScoreCard?.length * 120 }}
        search={false}
        columns={columnsScoreCard}
        request={async (params = {}, sorter, filter) => {
          return request(params, sorter, filter);
        }}
      />
    </div>
  );
};
