import Condition from '@/components/Condition';
import {
  DeleteOutlined,
  MinusCircleOutlined,
  MonitorOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { Button, Input, message, Modal, Select, Table, Tabs, Tooltip } from 'antd';
import { useEffect, useImperativeHandle, useMemo, useState } from 'react';
import { useModel } from 'umi';
import { useVarSelectModal } from '../../model';
import MyTree from '../my-tree';
import style from './style.less';

const { TabPane } = Tabs;

const { Search } = Input;
const { Option } = Select;

const SelectorModal: React.FC<any> = (props: any) => {
  const { cref, confirm, tableLoading = false } = props;

  // 对象
  const [selectList, setSelectList] = useState<any[]>([]);

  const info = { id: '100' };

  const { loading, treeList, varList, totalSize, getTreeList, getVarInfo } = useVarSelectModal();

  const [classType, setClassType] = useState<string>('');

  const [visible, setVisible] = useState<boolean>(false);
  // 页码, 分页相关
  const [current1, setCurrent1] = useState<number>(1);

  // 选中key值
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);
  const [selectRow, setSelectRow] = useState<any>([]);

  const columns1: any[] = [
    // 问题列表-列
    {
      title: () => {
        return (
          <div className={style['selectAll']}>
            <span style={{ height: '24px', lineHeight: '24px' }}>变量名称</span>
            <div>
              <Button size="small" style={{ marginRight: '16px' }} onClick={clearSelect}>
                清除选择
              </Button>
              <Button size="small" type="primary" onClick={selectAll}>
                全选该分类变量
              </Button>
            </div>
          </div>
        );
      },
      dataIndex: 'featureName',
      width: 300,
    },
  ];

  // 切换分页
  const onChange1 = (val: any) => {
    if (loading) {
      return;
    }
    setCurrent1(val);
    // if (classType) {
    getVarInfo({
      page: val || 1,
      pageSize: 10,
    });
    // } else {
    // setVarList([]);
    // }
  };

  const clearSelect = () => {
    let arr = selectedRowKeys?.filter((item: any) =>
      varList?.find((val) => val.id == item.recommendId),
    );
    let arr2 = selectList?.filter((item) => varList?.find((val) => val.id == item));
    setSelectList(arr2);
    setSelectedRowKeys(arr);
  };

  const selectAll = () => {
    let clearArr = selectedRowKeys?.filter((item: any) =>
      varList?.find((val) => val.id == item.recommendId),
    );
    let clearArr2 = selectList?.filter((item) => varList?.find((val) => val.id == item));
    let arr = varList.map((item) => {
      return item?.id;
    });
    let arr2 = varList.map((item) => {
      return {
        recommendId: item.id,
        recommendName: item.question,
        recommendType: 1,
      };
    });

    setSelectList([...clearArr2, ...arr2]);
    setSelectedRowKeys([...clearArr, ...arr]);
  };

  // 搜索文本
  const [searchText1, setSearchText1] = useState<any>('');

  // 监听查询内容输出
  const onSearchChange1 = (e: any) => {
    setSearchText1(e.target.value);
  };

  // faq列表触发查询
  const onSearch1 = (val: any) => {
    if (!classType) {
      return;
    }
    setCurrent1(1);
    getVarInfo({
      page: 1,
      pageSize: 10,
    });
  };

  // 选中
  const onSelect = (val: any) => {
    console.log(val[0]);
    if (!val[0]) {
      return;
    }
    setClassType(val[0]);
    setCurrent1(1);
    getVarInfo({
      page: 1,
      pageSize: 10,
    });
  };

  // 勾选筛选设置
  const rowSelection = {
    preserveSelectedRowKeys: true,
    onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
      console.log(selectedRowKeys, selectedRows);

      setSelectedRowKeys(selectedRowKeys);
      setSelectRow(selectedRows);
      setSelectList(selectedRows);
    },
  };

  useImperativeHandle(cref, () => ({
    open: (obj: any) => {
      getTreeList(info.id); // 获取faq列表
      // 显示
      setVisible(true);
    },
    close: () => {
      setSearchText1('');
      setVisible(false);
    },
  }));

  // 提交
  const submit = async () => {
    let res: any;
    res = await confirm(selectList || []);
    if (res) {
      setSearchText1('');
      setVisible(false);
    }
  };

  // 删除某个选项
  const deleteItem = (item: any, index: number) => {
    selectList.splice(index, 1);
    let _selectedRowKeys = selectedRowKeys.filter((_item: any) => {
      return _item !== item.featureCode;
    });
    setSelectedRowKeys(_selectedRowKeys);
  };

  useEffect(() => {
    getVarInfo({
      page: 1,
      pageSize: 10,
    });
  }, []);

  return (
    <Modal
      className={style['modal-bg']}
      width={950}
      title={'变量选择'}
      visible={visible}
      maskClosable={false}
      onCancel={() => {
        setSearchText1('');
        setVisible(false);
      }}
      okText={'确定'}
      onOk={submit}
      footer={[
        <Button
          key="back"
          onClick={() => {
            setSearchText1('');
            setVisible(false);
          }}
          loading={tableLoading}
        >
          取消
        </Button>,
        <Button key="submit" type="primary" loading={tableLoading} onClick={submit}>
          确定
        </Button>,
      ]}
    >
      <div className={style['modal-bg_default']}>
        <div className={style['select-box']}>
          {/* <Condition r-if={selectList.length > 0}> */}
          <div className={style['title']}>已选择的变量</div>

          <div className={style['select-content']}>
            {selectList.map((item: any, index: number) => {
              return (
                <div className={style['select-item']} key={index}>
                  <Button
                    type="link"
                    onClick={() => {
                      deleteItem(item, index);
                    }}
                  >
                    <MinusCircleOutlined className={style['del']} />
                  </Button>
                  <Tooltip placement="topLeft" title={item.featureName}>
                    <div className={style['label']}>
                      <span className={style['num']}>{index + 1}.</span>
                      {item.featureName}
                    </div>
                  </Tooltip>
                </div>
              );
            })}
          </div>
          {/* </Condition> */}
        </div>

        <div className={style['zy-row']}>
          <div className={style['page_left']}>
            <div className={style['zy-row_start']}>变量列表</div>
            <MyTree draggable={false} onChange={onSelect} data={treeList} edit={false} size="sm" />
          </div>

          <div className={style['page_content']}>
            <div className={style['zy-row_end']}>
              <Input.Group compact>
                <Select
                  defaultValue={'feature'}
                  // onChange={}
                  style={{ backgroundColor: '#fff' }}
                >
                  <Option value={'feature'}>变量</Option>
                  <Option value={'model'}>模型</Option>
                </Select>
                <Search
                  placeholder="输入搜索"
                  value={searchText1}
                  onSearch={onSearch1}
                  onPressEnter={onSearch1}
                  onChange={onSearchChange1}
                  allowClear
                  style={{ width: '300px' }}
                />
              </Input.Group>
            </div>

            <div className={style['table-box']}>
              <Table
                rowSelection={{
                  // type: type === 'radio' ? 'radio' : 'checkbox',
                  ...rowSelection,
                  selectedRowKeys: selectedRowKeys,
                  hideSelectAll: false,
                }}
                // expandable={{
                //   expandedRowRender: expendRender,
                //   // 可扩展
                //   rowExpandable: (record: any) => record?.answerList?.length > 0,
                // }}
                size="small"
                pagination={{
                  current: current1,
                  onChange: onChange1,
                  total: totalSize,
                  showSizeChanger: false,
                }}
                dataSource={varList}
                columns={columns1}
                rowKey="featureCode"
                loading={loading}
              />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SelectorModal;
