import Condition from '@/components/Condition';
import { DeleteOutlined, MonitorOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Input, message, Modal, Table, Tabs, Tooltip } from 'antd';
import { useEffect, useImperativeHandle, useMemo, useState } from 'react';
import { useModel } from 'umi';
import NextStepButton from '../../components/nextstep-button';
import { useStrategyBackModel } from './model';
import style from './style.less';
import styles from '../style.less';

const { TabPane } = Tabs;

const columns1: any[] = [
  // 问题列表-列
  {
    title: '编排名称',
    dataIndex: 'name',
    width: 300,
  },
  {
    title: '样本包括的总数量',
    dataIndex: 'num',
    width: 200,
  },
];

const { Search } = Input;

// selectlist  (recommendType、recommendId、recommend)
// disabledWishKeys    禁止选择的意图
// disabledQuestionKeys  禁止选择的问题
// selectedKeys  已选择的问题
// selectedWishKeys 已选择的意图

const SelectorTable: React.FC<any> = (props: any) => {
  const { cref, confirm, type = 'checkbox', onNext } = props;

  // tabs 操作
  const [activeKey, setActivekey] = useState<string>('1');

  // 对象
  const [selectList, setSelectList] = useState<any[]>([]);

  //  批量相关操作

  const { tableList, loading, getStrategyTableList } = useStrategyBackModel();

  // ------------------------

  // 选中key值
  const [selectedKeys, setSelectedKeys] = useState<any[]>([]);

  // 勾选筛选设置
  const rowSelection = {
    preserveSelectedRowKeys: true,
    onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
      // 如果是单选
      // 设置选中数组
      setSelectedKeys(selectedRowKeys);
    },
    getCheckboxProps: (record: any) => {
      return {
        disabled: false,
        name: record.name,
      };
    },
  };

  // 查询数据库
  useEffect(() => {
    getStrategyTableList({});
  }, []);

  const onClick = () => {
    if (selectedKeys.length === 0) {
      message.warning('请选择需要回溯的编排');
    } else {
      onNext?.(selectedKeys);
    }
  };

  return (
    <div className={style['page-content']}>
      <div className={styles['step-tips']}>选择需要回溯的编排：</div>
      <div className={style['table-box']}>
        <Table
          rowSelection={{
            type: 'checkbox',
            ...rowSelection,
            selectedRowKeys: selectedKeys,
            hideSelectAll: true,
          }}
          size="small"
          pagination={false}
          dataSource={tableList}
          columns={columns1}
          rowKey="id"
          loading={loading}
        />
      </div>

      <NextStepButton onClick={onClick} text={'提交'} />
    </div>
  );
};

export default SelectorTable;
