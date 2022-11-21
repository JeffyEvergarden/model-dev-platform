import Condition from '@/components/Condition';
import { DeleteOutlined, MonitorOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Input, message, Modal, Table, Tabs, Tooltip } from 'antd';
import { useEffect, useImperativeHandle, useMemo, useState } from 'react';
import { useModel } from 'umi';
import { useStepSelectModel } from './model';
import MyTree from './components/my-tree';
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

const SelectorModal: React.FC<any> = (props: any) => {
  const { cref, confirm, type = 'checkbox' } = props;

  // tabs 操作
  const [activeKey, setActivekey] = useState<string>('1');

  // 对象
  const [selectList, setSelectList] = useState<any[]>([]);

  //  批量相关操作

  const changeActiveKey = (val: any) => {
    setActivekey(val);
    if (activeKey === '1') {
      onChange1(1);
    }
  };

  const [classType, setClassType] = useState<string>('');

  const { treeList, tableList, getTreeList, getTableList, total, tableLoading } =
    useStepSelectModel();

  // 页码, 分页相关
  const [current1, setCurrent1] = useState<number>(1);

  // 切换分页
  const onChange1 = (val: any) => {
    if (tableLoading) {
      return;
    }
    setCurrent1(val);
  };

  // 搜索文本
  const [searchText1, setSearchText1] = useState<any>('');
  // 点击节点
  const onSelect = () => {
    getTableList();
  };

  // 监听查询内容输出
  const onSearchChange1 = (e: any) => {
    setSearchText1(e.target.value);
  };

  // 搜索列表触发查询
  const onSearch1 = () => {
    setCurrent1(1);
  };

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
    getTreeList();
  }, []);

  return (
    <div className={style['modal-bg_default']}>
      <Tabs activeKey={activeKey}>
        <TabPane tab="选择数据集" key="1">
          <div className={style['zy-row']}>
            <div className={style['page_left']}>
              <div className={style['search-box']}>
                <Search
                  placeholder="输入数据库/表名进行搜索"
                  value={searchText1}
                  onSearch={onSearch1}
                  onPressEnter={onSearch1}
                  onChange={onSearchChange1}
                  allowClear
                />
              </div>
              <MyTree
                draggable={false}
                onChange={onSelect}
                data={treeList}
                edit={false}
                size="sm"
              />
            </div>

            <div className={style['page_content']}>
              <div className={style['table-box']}>
                <Table
                  rowSelection={{
                    type: type === 'radio' ? 'radio' : 'checkbox',
                    ...rowSelection,
                    selectedRowKeys: selectedKeys,
                    hideSelectAll: true,
                  }}
                  size="small"
                  pagination={{
                    current: current1,
                    onChange: onChange1,
                    total: total,
                    showSizeChanger: false,
                  }}
                  dataSource={tableList}
                  columns={columns1}
                  rowKey="key"
                  loading={tableLoading}
                />
              </div>
            </div>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default SelectorModal;
