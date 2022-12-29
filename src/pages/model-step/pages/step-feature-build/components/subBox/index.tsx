import { DownloadOutlined } from '@ant-design/icons';
import { Button, Progress, Select, Table } from 'antd';
import { boxList } from '../../config';
import style from './style.less';
import styles from '../../../style.less';
import classnames from 'classnames';
import { useComparePage } from '../../../step-model-compare/model';
import { useEffect, useRef, useState } from 'react';
import ProTable from '@ant-design/pro-table';
import { changeData } from '@/utils';

const SubBox: React.FC<any> = (props: any) => {
  const { Option } = Select;
  const actionRef = useRef<any>();
  const { codeList, relateCodeList, getScoreCardList } = useComparePage();
  const [tableList, setTableList] = useState<any>([]);

  const columnsScoreCard: any = [
    {
      title: '变量名称',
      dataIndex: 'name',
      render: (t: any, r: any, i: any) => {
        return {
          children: r.name,
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
          children: r.nameZH,
          props: {
            rowSpan: r.namerowSpan,
          },
        };
      },
    },
    {
      title: '分箱',
      dataIndex: 'divider',
    },
    {
      title: '分数',
      dataIndex: 'score',
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
      <div style={{ marginBottom: '16px' }}>
        分箱方式：
        <Select placeholder={'请选择分箱方式'} allowClear style={{ marginRight: '16px' }}>
          {boxList?.map((item: any) => (
            <Option key={item.value} value={item.value}>
              {item.label}
            </Option>
          ))}
        </Select>
        <Button type="primary">开始分箱</Button>
      </div>
      {/* <Table
        // pagination={false}
        className={style['subBoxTable']}
        dataSource={tableList}
        columns={columnsScoreCard}
        scroll={{ x: columnsScoreCard.length * 200 }}
        rowKey="month"
        title={() => (
          <div className={style['title']}>
            <span>分箱结果</span>{' '}
            <Button type="link" icon={<DownloadOutlined />}>
              下载
            </Button>
          </div>
        )}
        // onChange={tableChange}
      /> */}

      <div className={classnames(styles.relateTable)}>
        <ProTable
          className={style['tableBox']}
          headerTitle={
            <div className={style['title']}>
              <span>分箱结果</span>{' '}
              <Button type="link" icon={<DownloadOutlined />}>
                下载
              </Button>
            </div>
          }
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
    </div>
  );
};

export default SubBox;
