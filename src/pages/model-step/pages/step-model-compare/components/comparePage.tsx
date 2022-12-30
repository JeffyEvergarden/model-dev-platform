import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Descriptions, Button, Space, Progress } from 'antd';
import styles from './index.less';
import { ProTable } from '@ant-design/pro-components';
import { useComparePage } from './../model';
import Condition from '@/components/Condition';
import classnames from 'classnames';
import { ZoomInOutlined } from '@ant-design/icons';
import RelateModal from './relateModal';
import InputVariableTable from '@/pages/model-step/components/inputVariableTable';
import VarCodeRelateTable from '@/pages/model-step/components/varCodeRelateTable';
import ScoreCardTable from '@/pages/model-step/components/scoreCardTable';
import { changeData } from '@/utils';
import CompareAndReportCommonPage from '@/pages/model-step/components/compareAndReportCommonPage';

export default (props: any) => {
  const { data } = props;

  const { codeList, relateCodeList, getScoreCardList, stableDataQuery } = useComparePage();

  const actionRef = useRef<any>();
  const relateModalRef = useRef<any>({});

  const [pageInfo, setPageInfo] = useState<any>([]);

  //变量相关性
  const [dataSourceRelate, setDataSourceRelate] = useState<any>([]);
  const [columnsRelate, setColumnsRelate] = useState<any>([]);

  useEffect(() => {
    getVarCode(); //变量相关性
  }, []);

  const getVarCode = async () => {
    let params = {};
    let res = await relateCodeList(params);
    setDataSourceRelate(res?.data?.list);
    setColumnsRelate(res?.data?.columnsRelate);
  };

  const varCodeList = async (payload: any) => {
    let params = {};

    let res = await codeList(params);
    setPageInfo(res?.data);
    return {
      data: res?.data?.list || [],
      total: res?.data?.total || 0,
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
        <InputVariableTable
          headerTitle="入模变量"
          rowKey={(record: any) => record.id}
          actionRef={actionRef}
          pageInfo={pageInfo}
          request={async (params = {}) => {
            return varCodeList(params);
          }}
        />
      </div>
      <div className={classnames(styles.relateTable)}>
        <VarCodeRelateTable
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
          columns={columnsRelate}
          dataSource={dataSourceRelate}
        />
      </div>
      <div className={classnames(styles.relateTable)}>
        <ScoreCardTable
          pageType="compareAndReport"
          headerTitle="评分卡-计算逻辑"
          rowKey={(record: any) => record.id}
          toolBarRender={() => []}
          actionRef={actionRef}
          request={async (params = {}) => {
            return scoreCardList(params);
          }}
        />
      </div>
      <CompareAndReportCommonPage pageType="comparePage" />
      <RelateModal
        columnsRelate={columnsRelate}
        dataSourceRelate={dataSourceRelate}
        cref={relateModalRef}
      />
    </div>
  );
};
