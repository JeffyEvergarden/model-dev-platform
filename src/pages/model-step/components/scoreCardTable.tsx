import React, { Fragment, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import { ProTable } from '@ant-design/pro-components';
import { Button, Checkbox, message, Pagination, Progress, Table } from 'antd';
import styles from './style.less';
import classnames from 'classnames';
import { changeData } from '@/utils';
import { useModel, history } from 'umi';
import { useComparePage } from '@/pages/model-step/pages/step-model-compare/model';
import { successCode } from '../pages/step-define-sample/model';

export default (props: any) => {
  const {
    cref,
    pageType,
    headerTitle,
    rowKey,
    toolBarRender,
    actionRef,
    activeKey,
    originTableList = [],
  } = props;

  const { modelId } = useModel('step', (model: any) => ({
    modelId: model.modelId,
  }));

  const { scoreCardListReuqest } = useComparePage();

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
    // if (pageType != 'compareAndReport') {
    let arr = originTableList.map((item: any) => {
      return item.variable;
    });
    resetTable();
    setSelectList(arr);
    setSelectAll(true);
    // }
  }, [originTableList]);

  const resetTable = () => {
    let list = originTableList.filter((item: any, index: any) => {
      return index >= (page - 1) * pageSize && index < page * pageSize;
    });

    if (pageType == 'compareAndReport') {
      setTableData(togetherDataComRe(list));
    } else {
      setTableData(togetherData(list));
    }
  };

  const togetherDataComRe = (data: any) => {
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
      hideInTable: pageType == 'varBinning' ? true : false,
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
    page,
    setPage,
    pageSize,
    setPageSize,
  }));

  const pageChange = async (page: any, size: any) => {
    if (pageType == 'compareAndReport') {
      let params = {
        page: page,
        pageSize: size,
        itmModelRegisCode: modelId,
        modelVersion: activeKey,
      };
      let res = await scoreCardListReuqest(params);
      if (res?.status?.code == successCode) {
        setPage(page);
        setPageSize(size);
        setTableData([...togetherDataComRe(res?.result?.tableData)]);
      } else {
        message.error(res?.status?.desc || '异常');
      }
    } else {
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
    }
  };

  return (
    <div className={classnames(styles.relateTable, styles.TableCommonSty)}>
      {/* <Condition r-if={pageType == 'compareAndReport'}>
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
      </Condition> */}

      {/* <Condition r-if={pageType != 'compareAndReport'}> */}
      <ProTable
        onChange={resetTable}
        headerTitle={headerTitle}
        rowKey={'variable'}
        toolBarRender={toolBarRender}
        options={false}
        bordered
        actionRef={actionRef}
        pagination={false}
        scroll={{ x: columnsScoreCard?.length * 120 }}
        search={false}
        columns={columnsScoreCard}
        dataSource={tableData}

        // request={async (params = {}, sort, filter) => {
        //   return requestMethod({ ...params, sort, filter });
        // }}
        // manualRequest={pageType == 'compareAndReport' ? false : true}
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
      {/* </Condition> */}
    </div>
  );
};
