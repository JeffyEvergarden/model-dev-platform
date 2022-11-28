import Condition from '@/components/Condition';
import { DeleteOutlined, MonitorOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Input, message, Modal, Table, Tabs, Tooltip } from 'antd';
import { useEffect, useImperativeHandle, useMemo, useState } from 'react';
import { useModel } from 'umi';
import NextStepButton from '../../components/nextstep-button';
import { useStrategyBackModel } from './model';
import style from './style.less';

const { TabPane } = Tabs;

const columns1: any[] = [
  // 问题列表-列
  {
    title: '字段名称',
    dataIndex: 'key',
    width: 200,
  },
  {
    title: '变量名称',
    dataIndex: 'name',
    width: 200,
  },
  {
    title: '变量类型',
    dataIndex: 'columnType',
    width: 120,
  },
  {
    title: '是否作为主键',
    dataIndex: 'isIndex',
    width: 120,
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
      if (type === 'radio') {
        let lastInfo = selectedRows?.[0];
        setSelectList([
          {
            recommendType: 1,
            recommendId: lastInfo.id,
            recommendName: lastInfo.question,
          },
        ]);
        setSelectedKeys(selectedRowKeys);
        return;
      }
      // 追加
      if (selectedRowKeys.length > selectedKeys.length) {
        // 获取
        let lastInfo = selectedRows?.[selectedRows.length - 1];
        if (lastInfo) {
          setSelectList([
            ...selectList,
            {
              recommendType: 1,
              recommendId: lastInfo.id,
              recommendName: lastInfo.question,
            },
          ]);
        }
        // 减小
      } else if (selectedRowKeys.length < selectedKeys.length) {
        // 找出少了那个
        let keys: any = selectedKeys.filter((_key: any) => {
          return !selectedRowKeys.includes(_key);
        });
        console.log('少了', keys);
        // 进行剔除  过滤出来
        let list: any[] = selectList?.filter((item: any) => {
          return !(item.recommendType === 1 && keys.includes(item.recommendId));
        });
        // console.log(selectedKeys, keys, list);
        setSelectList(list);
      }
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
    onNext?.();
  };

  return (
    <div className={style['page-content']}>
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
          rowKey="key"
          loading={loading}
        />
      </div>

      <NextStepButton onClick={onClick} />
    </div>
  );
};

export default SelectorTable;
