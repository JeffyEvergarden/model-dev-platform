import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Descriptions, Button, Space, Progress } from 'antd';
import styles from './index.less';
import { ProTable } from '@ant-design/pro-components';
import { useComparePage } from './../model';
import Condition from '@/components/Condition';
import classnames from 'classnames';
import { ZoomInOutlined } from '@ant-design/icons';
import RelateModal from './relateModal';
import { changeData } from '@/utils';

export default (props: any) => {
  const { data } = props;

  const {
    codeList,
    relateCodeList,
    getScoreCardList,
    trateAndVerifyData,
    stableDataQuery,
    varCodeStableQuery,
  } = useComparePage();

  const actionRef = useRef<any>();
  const relateModalRef = useRef<any>({});

  const [pageInfo, setPageInfo] = useState<any>([]);

  //变量相关性
  const [dataSourceRelate, setDataSourceRelate] = useState<any>([]);
  const [columnsRelate, setColumnsRelate] = useState<any>([]);
  const [columnsRelateTemp, setColumnsRelateTemp] = useState<any>([]);

  //集合
  const [columnsCollect, setColumnsCollect] = useState<any>([
    {
      title: '集合',
      dataIndex: 'KS',
      key: 'KS',
      render: () => {
        return <div>KS</div>;
      },
    },
  ]);
  const [dataSourceCollect, setDataSourceCollect] = useState<any>([]);

  //年月
  const [columnsMonth, setColumnsMonth] = useState<any>([
    {
      title: '年月',
      dataIndex: 'KS',
      key: 'KS',
      render: () => {
        return <div>KS</div>;
      },
    },
  ]);
  const [dataSourceMonth, setDataSourceMonth] = useState<any>([]);

  //训练集、验证集
  const [dataSourceTrate, setDataSourceTrate] = useState<any>([]);
  const [dataSourceVerify, setDataSourceVerify] = useState<any>([]);

  //模型稳定性
  const [columnsModelStable, setColumnsModelStable] = useState<any>([
    {
      title: '评分区间',
      dataIndex: 'value1',
      key: 'value1',
    },
    {
      title: '占比',
      children: [
        {
          title: '训练集占比',
          dataIndex: 'value2',
          key: 'value2',
        },
        {
          title: '验证集占比',
          dataIndex: 'value3',
          key: 'value3',
        },
        // {
        //   title: '其他验证1占比',
        //   dataIndex: 'value4',
        //   key: 'value4'
        // }, {
        //   title: '其他验证2占比',
        //   dataIndex: 'value5',
        //   key: 'value5'
        // }
      ],
    },
    {
      title: 'PSI',
      children: [
        {
          title: 'PSI_valid',
          dataIndex: 'value6',
          key: 'value6',
          render: (t: any, r: any, i: any) => {
            return <span style={{ color: r.value1 == '合计' ? 'red' : '' }}>{t}</span>;
          },
        },
        // {
        //   title: 'PSI_valid1',
        //   dataIndex: 'value7',
        //   key: 'value7'
        // }, {
        //   title: 'PSI_valid2',
        //   dataIndex: 'value8',
        //   key: 'value8'
        // }
      ],
    },
  ]);
  const [dataSourceModelStable, setDataSourceModelStable] = useState<any>([]);

  //变量稳定性
  const [columnsVarCodeStable, setColumnsVarCodeStable] = useState<any>([
    {
      title: '变量名称',
      dataIndex: 'value1',
      key: 'value1',
    },
    {
      title: '中文名字',
      dataIndex: 'value2',
      key: 'value2',
    },
    {
      title: 'PSI_valid',
      dataIndex: 'value3',
      key: 'value3',
    },
  ]);

  useEffect(() => {
    getVarCode(); //变量相关性
    getCollect();
    getTrateAndVerifyData();
    getStableData();
  }, []);

  useEffect(() => {
    let temp: any = [
      {
        title: '',
        dataIndex: 'name',
        key: 'name',
        ellipsis: true,
        fixed: 'left',
        render: (t: any, r: any, i: any) => {
          return <span className={styles.cellSty}>{r.name}</span>;
        },
      },
    ];
    columnsRelateTemp?.map((item: any, index: any) => {
      temp.push({
        title: item.name,
        dataIndex: item.dataIndex,
        key: item,
        ellipsis: true,
        render: (t: any, r: any, i: any) => {
          let currentVal = Math.abs(Number(r?.[item.dataIndex]));
          return (
            <Fragment>
              {(currentVal < 0.1 || currentVal == 0.1) && (
                <span className={classnames(styles.commonSty, styles.colorFir)}>{t}</span>
              )}
              {0.1 < currentVal && (currentVal < 0.2 || currentVal == 0.2) && (
                <span className={classnames(styles.commonSty, styles.colorTwo)}>{t}</span>
              )}
              {0.2 < currentVal && (currentVal < 0.3 || currentVal == 0.3) && (
                <span className={classnames(styles.commonSty, styles.colorThree)}>{t}</span>
              )}
              {0.3 < currentVal && (currentVal < 0.4 || currentVal == 0.4) && (
                <span className={classnames(styles.commonSty, styles.colorFour)}>{t}</span>
              )}
              {0.4 < currentVal && (currentVal < 0.5 || currentVal == 0.5) && (
                <span className={classnames(styles.commonSty, styles.colorFive)}>{t}</span>
              )}
              {0.5 < currentVal && currentVal < 1 && (
                <span className={classnames(styles.commonSty, styles.colorSix)}>{t}</span>
              )}
              {currentVal == 1 && (
                <span className={classnames(styles.commonSty, styles.colorSeven)}>{t}</span>
              )}
            </Fragment>
          );
        },
      });
    });
    setColumnsRelate(temp);
  }, [columnsRelateTemp]);

  const getVarCodeStable = async (payload: any) => {
    let params = {};
    let res = await varCodeStableQuery(params);
    let columnsVarCodeStableTemp: any[] = [...columnsVarCodeStable];
    res?.data?.columnsVarCodeStableLsit.map((item: any) => {
      columnsVarCodeStableTemp.push({
        title: item?.name,
        dataIndex: item?.dataIndex,
        key: item?.dataIndex,
      });
    });
    setColumnsVarCodeStable(columnsVarCodeStableTemp);
    return {
      data: res?.data?.list || [],
      total: res?.data?.totalPage || 0,
      current: payload.current,
      pageSize: payload.pageSize,
    };
  };

  const getStableData = async () => {
    let params = {};
    let res = await stableDataQuery(params);
    setDataSourceModelStable(res?.data?.list);
    let columnsModelStableTemp: any[] = [...columnsModelStable];
    res?.data?.otherVerifyList?.map((item: any) => {
      columnsModelStableTemp?.[1]?.children?.push({
        title: item?.name,
        dataIndex: item?.dataIndex,
        key: item?.name,
      });
    });
    res?.data?.PSI_valid_List?.map((item: any) => {
      columnsModelStableTemp?.[2]?.children?.push({
        title: item?.name,
        dataIndex: item?.dataIndex,
        key: item?.name,
        render: (t: any, r: any, i: any) => {
          return <span style={{ color: r.value1 == '合计' ? 'red' : '' }}>{t}</span>;
        },
      });
    });
    setColumnsModelStable(columnsModelStableTemp);
  };

  const getTrateAndVerifyData = async () => {
    let params = {};
    let res = await trateAndVerifyData(params);
    setDataSourceTrate(res?.data?.listTrate);
    setDataSourceVerify(res?.data?.listVerify);
  };

  const getCollect = () => {
    let temp = [
      { name: '训练集', value: '36.25%', dataIndex: 'trate' },
      { name: '验证集', value: '55.25%', dataIndex: 'verify' },
      { name: '其他验证集', value: '36.25%', dataIndex: 'other' },
    ];
    let dataTemp = [{ trate: '36.25%', verify: '55.25%', other: '46.55%' }];
    let tempColumn = [...columnsCollect];
    temp.map((item: any) => {
      tempColumn.push({
        title: item?.name,
        dataIndex: item?.dataIndex,
        key: item?.name,
      });
    });
    setColumnsCollect(tempColumn);
    setDataSourceCollect(dataTemp);

    let tempMonth = [
      { name: '2021-02', value: '36.25%', dataIndex: '2021-02' },
      { name: '2021-03', value: '55.25%', dataIndex: '2021-03' },
      { name: '2021-04', value: '36.25%', dataIndex: '2021-04' },
    ];
    let dataTempMonth = [{ '2021-02': '36.25%', '2021-03': '55.25%', '2021-04': '46.55%' }];
    let tempColumnMonth = [...columnsMonth];
    tempMonth.map((item: any) => {
      tempColumnMonth.push({
        title: item?.name,
        dataIndex: item?.dataIndex,
        key: item?.name,
      });
    });
    setColumnsMonth(tempColumnMonth);
    setDataSourceMonth(dataTempMonth);
  };

  const getVarCode = async () => {
    let params = {};
    let res = await relateCodeList(params);
    setDataSourceRelate(res?.data?.list);
    setColumnsRelateTemp(res?.data?.columnsRelate);
  };

  const varCodeList = async (payload: any) => {
    let params = {};

    let res = await codeList(params);
    setPageInfo(res?.data);
    return {
      data: res?.data?.list || [],
      total: res?.data?.totalPage || 0,
      current: payload.current,
      pageSize: payload.pageSize,
    };
  };

  const openMax = () => {
    relateModalRef?.current?.open();
  };

  const scoreCardList = async (payload: any) => {
    let params = {};

    let res = await getScoreCardList(params);
    let tempArr: any = [];
    res?.data?.list?.map((item: any, index: any) => {
      item?.dividerList?.map((el: any) => {
        tempArr.push({
          idx: index,
          id: item.id + '-' + el.id,
          name: item?.name,
          nameZH: item?.nameZH,
          divider: el?.divider,
          score: el?.score,
          badRate: el?.badRate,
          trateRate: el?.trateRate,
          trateCurrentRate: el?.trateCurrentRate,
          verifyCurrentRate: el?.verifyCurrentRate,
        });
      });
    });
    changeData(tempArr, 'name');
    return {
      data: tempArr || [],
      total: res?.data?.total || 0,
      current: payload.current,
      pageSize: payload.pageSize,
    };
  };

  const columns: any[] = [
    {
      title: '序号',
      width: 50,
      dataIndex: 'index',
      render: (t: any, r: any, index: number) => {
        return (Number(pageInfo.pageNum) - 1) * Number(pageInfo.pageSize) + Number(index);
      },
    },
    {
      title: '变量名称',
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: '中文名称',
      dataIndex: 'nameZH',
      ellipsis: true,
    },
    ,
    {
      title: '变量来源',
      dataIndex: 'source',
      ellipsis: true,
    },
    {
      title: '自由度',
      dataIndex: 'free',
      ellipsis: true,
    },
    {
      title: 'coef_',
      dataIndex: 'coef_',
      ellipsis: true,
    },
    {
      title: 'VIF',
      dataIndex: 'VIF',
      ellipsis: true,
    },
    {
      title: 'wald_test',
      dataIndex: 'wald_test',
      ellipsis: true,
    },
    {
      title: 'p_value',
      dataIndex: 'p_value',
      ellipsis: true,
    },
    {
      title: 'iv',
      dataIndex: 'iv',
      ellipsis: true,
    },
  ];

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
  ];

  const columnsTrate: any = [
    {
      title: '评分区间',
      dataIndex: 'value1',
      key: 'value1',
    },
    {
      title: '总样本数',
      dataIndex: 'value2',
      key: 'value2',
    },
    {
      title: '好样本数',
      dataIndex: 'value3',
      key: 'value3',
    },
    {
      title: '坏样本数',
      dataIndex: 'value4',
      key: 'value4',
    },
    {
      title: '坏样本率',
      dataIndex: 'value5',
      key: 'value5',
    },
    {
      title: '累计好样本率',
      dataIndex: 'value6',
      key: 'value6',
    },
    {
      title: '累计坏样本率',
      dataIndex: 'value7',
      key: 'value7',
    },
    {
      title: 'KS',
      dataIndex: 'value8',
      key: 'value8',
    },
    {
      title: 'lift',
      dataIndex: 'value9',
      key: 'value9',
    },
  ];

  return (
    <div className={styles.comparePage}>
      <div className={styles.mouldTitile}>
        <b>模型构建参数</b>
      </div>
      <Descriptions title="LogisticRegression参数" bordered column={4}>
        <Descriptions.Item label="惩罚项">12</Descriptions.Item>
        <Descriptions.Item label="solver">liblinear</Descriptions.Item>
        <Descriptions.Item label="正则化系数">1.0</Descriptions.Item>
        <Descriptions.Item label="迭代次数">100</Descriptions.Item>
      </Descriptions>
      <Descriptions title="变量分箱" bordered column={4}>
        <Descriptions.Item label="分箱方式">等频分箱</Descriptions.Item>
        <Descriptions.Item label="箱数">10</Descriptions.Item>
        <Descriptions.Item label="每箱最小样本占比">0.1</Descriptions.Item>
        <Descriptions.Item label="空值单独分箱">否</Descriptions.Item>
      </Descriptions>
      <Descriptions title="逐步回归" bordered column={4}>
        <Descriptions.Item label="estimator">ols</Descriptions.Item>
        <Descriptions.Item label="方向">both</Descriptions.Item>
        <Descriptions.Item label="评判标准">aic</Descriptions.Item>
        <Descriptions.Item label="最大循环次数">100</Descriptions.Item>
      </Descriptions>
      <Descriptions title="多重共线性检验" bordered column={4}>
        <Descriptions.Item label="VIF阈值设置" span={3}>
          {'<10'}
        </Descriptions.Item>
      </Descriptions>
      <Descriptions title="标准评分卡" bordered column={4}>
        <Descriptions.Item label="标准分">100</Descriptions.Item>
        <Descriptions.Item label="Pdo">100</Descriptions.Item>
        <Descriptions.Item label="Base Odds">100</Descriptions.Item>
        <Descriptions.Item label="Rate">100</Descriptions.Item>
        <Descriptions.Item label="评分分箱方式" span={3}>
          等频分箱
        </Descriptions.Item>
      </Descriptions>
      <div className={styles.tableBox}>
        <span className={styles.tableTitle}>模型结果</span>
        <ProTable
          headerTitle="入模变量"
          rowKey={(record: any) => record.id}
          toolBarRender={() => []}
          options={false}
          bordered
          actionRef={actionRef}
          pagination={{
            pageSize: 10,
          }}
          search={false}
          columns={columns}
          request={async (params = {}) => {
            return varCodeList(params);
          }}
        />
      </div>
      <div className={classnames(styles.relateTable)}>
        <ProTable
          headerTitle="变量相关性"
          rowKey={(record: any) => record.id}
          toolBarRender={() => [
            <div
              key={'ZoomInOutlined'}
              onClick={openMax}
              style={{ color: 'rgb(24, 144, 255)', cursor: 'pointer' }}
            >
              <Space>
                <ZoomInOutlined />
                放大查看
              </Space>
            </div>,
          ]}
          options={false}
          bordered
          pagination={false}
          search={false}
          columns={columnsRelate}
          dataSource={dataSourceRelate}
          scroll={{
            x: columnsRelate?.length * 150,
            y: dataSourceRelate?.length > 10 ? 200 : undefined,
          }}
        />
      </div>
      <div className={classnames(styles.relateTable)}>
        <ProTable
          headerTitle="评分卡-计算逻辑"
          rowKey={(record: any) => record.id}
          toolBarRender={() => []}
          options={false}
          bordered
          actionRef={actionRef}
          pagination={{
            pageSize: 10,
          }}
          search={false}
          columns={columnsScoreCard}
          request={async (params = {}) => {
            return scoreCardList(params);
          }}
        />
      </div>
      <div className={styles.tableBox}>
        <ProTable
          headerTitle=""
          rowKey={(record: any) => record.id}
          toolBarRender={() => []}
          options={false}
          bordered
          pagination={false}
          search={false}
          columns={columnsCollect}
          dataSource={dataSourceCollect}
          scroll={{ y: 500 }}
        />
      </div>
      <div className={styles.tableBox}>
        <ProTable
          headerTitle=""
          rowKey={(record: any) => record.id}
          toolBarRender={() => []}
          options={false}
          bordered
          pagination={false}
          search={false}
          columns={columnsMonth}
          dataSource={dataSourceMonth}
          scroll={{ y: 500 }}
        />
      </div>
      <div className={styles.tableBox}>
        <ProTable
          headerTitle="训练集分布"
          rowKey={(record: any) => record.id}
          toolBarRender={() => []}
          options={false}
          bordered
          pagination={false}
          search={false}
          columns={columnsTrate}
          dataSource={dataSourceTrate}
          scroll={{ y: 500 }}
        />
      </div>
      <div className={styles.tableBox}>
        <ProTable
          headerTitle="验证集分布"
          rowKey={(record: any) => record.id}
          toolBarRender={() => []}
          options={false}
          bordered
          pagination={false}
          search={false}
          columns={columnsTrate}
          dataSource={dataSourceVerify}
          scroll={{ y: 500 }}
        />
      </div>
      <div className={styles.tableBox}>
        <ProTable
          headerTitle="模型稳定性"
          rowKey={(record: any) => record.id}
          toolBarRender={() => []}
          options={false}
          bordered
          pagination={false}
          search={false}
          columns={columnsModelStable}
          dataSource={dataSourceModelStable}
          scroll={{ y: 500 }}
        />
      </div>
      <div className={classnames(styles.tableBox)}>
        <ProTable
          headerTitle="变量稳定性"
          rowKey={(record: any) => record.id}
          toolBarRender={() => []}
          options={false}
          bordered
          actionRef={actionRef}
          pagination={{
            pageSize: 10,
          }}
          search={false}
          columns={columnsVarCodeStable}
          request={async (params = {}) => {
            return getVarCodeStable(params);
          }}
        />
      </div>
      <RelateModal
        columnsRelate={columnsRelate}
        dataSourceRelate={dataSourceRelate}
        cref={relateModalRef}
      />
    </div>
  );
};
