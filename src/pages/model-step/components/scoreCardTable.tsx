import React, { Fragment, useEffect, useState } from 'react';
import { ProTable } from '@ant-design/pro-components';
import { Progress } from 'antd';
import styles from './style.less';
import classnames from 'classnames';
import { changeData } from '@/utils';

export default (props: any) => {
  const { pageType, headerTitle, rowKey, toolBarRender, actionRef, request, dataSource } = props;
  const columnsScoreCard: any = [
    {
      title: '变量名称',
      dataIndex: 'variable',
      render: (t: any, r: any, i: any) => {
        return {
          children: <span className={styles.cellSty}>{r.variable}</span>,
          props: {
            rowSpan: r.variablerowSpan,
          },
        };
      },
    },
    {
      title: pageType == 'compareAndReport' ? '中文含义' : '中文名称',
      dataIndex: 'variableName',
      render: (t: any, r: any, i: any) => {
        return {
          children: <span className={styles.cellSty}>{r.variableName}</span>,
          props: {
            rowSpan: r.variablerowSpan,
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
          children: <span className={styles.cellSty}>{r?.nameZH}</span>,
          props: {
            rowSpan: r.variablerowSpan,
          },
        };
      },
    },
    {
      title: '分箱',
      dataIndex: 'boxGroup',
      render: (t: any, r: any, i: any) => {
        return <span className={styles.cellSty}>{r.boxGroup}</span>;
      },
    },
    {
      title: '分数',
      dataIndex: 'boxGroupScore',
      hideInTable: pageType != 'compareAndReport',
      render: (t: any, r: any, i: any) => {
        return <span className={styles.cellSty}>{r.boxGroupScore}</span>;
      },
    },
    {
      title: '训练坏比率',
      dataIndex: 'trainBadRate',
      render: (t: any, r: any, i: any) => {
        let temp = r?.trainBadRate?.replace('%', '');
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
      dataIndex: 'validBadRate',
      render: (t: any, r: any, i: any) => {
        let temp = r?.validBadRate?.replace('%', '');
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
      dataIndex: 'trainGroupRate',
      render: (t: any, r: any, i: any) => {
        let temp = r?.trainGroupRate?.replace('%', '');
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
      dataIndex: 'validGroupRate',
      render: (t: any, r: any, i: any) => {
        let temp = r?.validGroupRate?.replace('%', '');
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
      title: '训练集KS',
      dataIndex: 'trainKs',
      hideInTable: pageType == 'compareAndReport',
      render: (t: any, r: any, i: any) => {
        return <span className={styles.cellSty}>{r.trainKs}</span>;
      },
    },
    {
      title: '验证集KS',
      dataIndex: 'validKs',
      hideInTable: pageType == 'compareAndReport',
      render: (t: any, r: any, i: any) => {
        return <span className={styles.cellSty}>{r.validKs}</span>;
      },
    },
    {
      title: '训练集IV',
      dataIndex: 'trainIv',
      hideInTable: pageType == 'compareAndReport',
      render: (t: any, r: any, i: any) => {
        return <span className={styles.cellSty}>{r.trainIv}</span>;
      },
    },
    {
      title: '验证集IV',
      dataIndex: 'trainIv',
      hideInTable: pageType == 'compareAndReport',
      render: (t: any, r: any, i: any) => {
        return <span className={styles.cellSty}>{r.trainIv}</span>;
      },
    },
    {
      title: '训练集PSI',
      dataIndex: 'validIv',
      hideInTable: pageType == 'compareAndReport',
      render: (t: any, r: any, i: any) => {
        return <span className={styles.cellSty}>{r.validIv}</span>;
      },
    },
    {
      title: '验证集PSI',
      dataIndex: 'validPsi',
      hideInTable: pageType == 'compareAndReport',
      render: (t: any, r: any, i: any) => {
        return <span className={styles.cellSty}>{r.validPsi}</span>;
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
        // request={async (params = {}, sorter, filter) => {
        //   return request(params, sorter, filter);
        // }}
        dataSource={dataSource}
      />
    </div>
  );
};
