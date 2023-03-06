import React, { Fragment, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import { ProTable } from '@ant-design/pro-components';
import { Button, Checkbox, Pagination, Progress, Table } from 'antd';
import styles from './style.less';
import classnames from 'classnames';
import { changeData } from '@/utils';
import Condition from '@/components/Condition';
import { DownloadOutlined } from '@ant-design/icons';

export default (props: any) => {
  const {
    cref,
    pageType,
    headerTitle,
    rowKey,
    toolBarRender,
    actionRef,
    requestMethod,
    originTableList = [],
  } = props;
  const [selectAll, setSelectAll] = useState(true);

  const [selectList, setSelectList] = useState<any>([]);
  const [page, setPage] = useState<any>(1);
  const [pageSize, setPageSize] = useState<any>(10);
  const [tableData, setTableData] = useState<any>([]);
  const varType: any = {
    number: '数值型',
    string: '字符串型',
    boolean: '布尔型',
    date: '日期型',
  };

  const onCheckAllChange = (e: any) => {
    let flag = e?.target?.checked;
    setSelectAll(flag);
    if (flag) {
      let arr = originTableList?.map((item: any) => {
        return item?.variable;
      });
      console.log(arr);
      setSelectList(arr);
      setSelectAll(true);
    } else {
      setSelectList([]);
    }
    actionRef?.current?.reload();
  };

  useEffect(() => {
    let arr = originTableList.map((item: any) => {
      return item.variable;
    });
    resetTable();
    setSelectList(arr);
    setSelectAll(true);
  }, [originTableList]);

  const resetTable = () => {
    let list = originTableList.filter((item: any, index: any) => {
      return index >= (page - 1) * pageSize && index < page * pageSize;
    });
    setTableData(togetherData(list));
  };

  const togetherData = (data: any) => {
    let tempArr: any = [];
    data?.map((item: any, index: any) => {
      item?.binning?.map((el: any) => {
        tempArr.push({
          idx: index,
          id: el?.variable,
          variable: item?.variable,
          variableName: item?.variableName,
          variableType: varType[item?.variableType],
          boxGroup: el?.boxGroup,

          trainBadRate: el?.trainBadRate,
          trainBoxRate: el?.trainBoxRate,
          trainIv: el?.trainIv,
          trainKs: el?.trainKs,
          trainPsi: el?.trainPsi,

          validBadRate: el?.validBadRate,
          validBoxRate: el?.validBoxRate,
          validIv: el?.validIv,
          validKs: el?.validKs,
          validPsi: el?.validPsi,
        });
      });
    });
    console.log(tempArr);

    return changeData(tempArr, 'variable');
  };

  const columnsScoreCard: any = [
    {
      title: <Checkbox checked={selectAll} onChange={onCheckAllChange} />,
      dataIndex: 'variableName',
      align: 'center',
      hideInTable: pageType == 'compareAndReport',
      render: (t: any, r: any, i: any) => {
        return {
          children: (
            <Checkbox
              checked={selectList?.includes(r?.variable)}
              onChange={(e: any) => {
                if (e?.target?.checked) {
                  if ([...selectList, r?.variable].length == originTableList?.length) {
                    setSelectAll(true);
                  }
                  setSelectList([...selectList, r?.variable]);
                } else {
                  setSelectAll(false);
                  setSelectList(selectList.filter((item: any) => item != r?.variable));
                }
              }}
            />
          ),
          props: {
            rowSpan: r.variablerowSpan,
          },
        };
      },
    },
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
      dataIndex: 'variableType',
      hideInTable: pageType == 'compareAndReport',
      filters: [
        {
          text: '数值型',
          value: '数值型',
        },
        {
          text: '字符串型',
          value: '字符串型',
        },
        {
          text: '布尔型',
          value: '布尔型',
        },
        {
          text: '日期型',
          value: '日期型',
        },
      ],
      render: (t: any, r: any, i: any) => {
        return {
          children: <span className={styles.cellSty}>{r?.variableType}</span>,
          props: {
            rowSpan: r.variablerowSpan,
          },
        };
      },
      onFilter: (a: any, b: any) => {
        console.log(a, b);
        return b?.variableType == a;
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
      dataIndex: 'score',
      hideInTable: pageType != 'compareAndReport',
      render: (t: any, r: any, i: any) => {
        return <span className={styles.cellSty}>{r.score}</span>;
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
      dataIndex: pageType == 'compareAndReport' ? 'trainRate' : 'trainBoxRate',
      render: (t: any, r: any, i: any) => {
        let temp =
          pageType == 'compareAndReport'
            ? r?.trainRate?.replace('%', '')
            : r?.trainBoxRate?.replace('%', '');
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
      dataIndex: pageType == 'compareAndReport' ? 'validRate' : 'validBoxRate',
      render: (t: any, r: any, i: any) => {
        let temp =
          pageType == 'compareAndReport'
            ? r?.validRate?.replace('%', '')
            : r?.validBoxRate?.replace('%', '');
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

  useImperativeHandle(cref, () => ({
    selectList,
  }));

  const pageChange = (page: any, size: any) => {
    setTableData([]);
    setPage(page);
    setPageSize(size);
    let list = originTableList.filter((item: any, index: any) => {
      return index < page * size && index >= (page - 1) * size;
    });
    console.log(list);
    setTimeout(() => {
      setTableData([...togetherData([...list])]);
    }, 100);
  };

  return (
    <div className={classnames(styles.relateTable, styles.TableCommonSty)}>
      <Condition r-if={pageType == 'compareAndReport'}>
        <ProTable
          headerTitle={headerTitle}
          rowKey={'variable'}
          toolBarRender={toolBarRender}
          options={false}
          bordered
          actionRef={actionRef}
          pagination={{ showSizeChanger: true, defaultPageSize: 10 }}
          scroll={{ x: columnsScoreCard?.length * 120 }}
          search={false}
          columns={columnsScoreCard}
          request={async (params = {}, sort, filter) => {
            return requestMethod({ ...params, sort, filter });
          }}
          manualRequest={pageType == 'compareAndReport' ? false : true}
          // dataSource={dataSource}
        />
      </Condition>

      <Condition r-if={pageType != 'compareAndReport'}>
        <Table
          onChange={resetTable}
          rowKey={'variable'}
          title={headerTitle}
          dataSource={tableData}
          columns={columnsScoreCard}
          scroll={{ x: columnsScoreCard?.length * 120 }}
          pagination={false}
        />
        <div style={{ marginBottom: '36px' }}>
          <Pagination
            style={{ float: 'right', marginTop: '12px' }}
            size={'small'}
            showSizeChanger
            total={originTableList?.length || 0}
            current={page}
            pageSize={pageSize}
            showTotal={(total, range) => `第 ${range[0]}-${range[1]} 条/总共 ${total} 条`}
            defaultPageSize={50}
            defaultCurrent={1}
            onChange={pageChange}
          />
        </div>
      </Condition>
    </div>
  );
};
