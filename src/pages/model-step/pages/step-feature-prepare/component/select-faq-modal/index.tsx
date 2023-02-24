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

  const {
    loading,
    treeList,
    varList,
    totalSize,
    listType,
    getTreeList,
    getVarInfo,
    getKeyVarInfo,
  } = useVarSelectModal();

  const [classType, setClassType] = useState<string>(''); //选中树(path)
  const [treeName, setTreeName] = useState<string>(''); //选中树

  const [visible, setVisible] = useState<boolean>(false);
  // 页码, 分页相关
  const [current1, setCurrent1] = useState<number>(1);

  const [searchMode, setSearchMode] = useState<any>('feature');

  // 选中key值
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);

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
    if (listType == 'search') {
      getKeyVarInfo({
        page: val || 1,
        pageSize: 10,
        keyword: searchText1,
        searchMode: searchMode,
      });
    } else {
      getVarInfo({
        page: val || 1,
        pageSize: 10,
        categoryName: val[0],
        categoryPath: treeName,
        searchType: '',
      });
    }
  };

  const clearSelect = async () => {
    if (!classType) {
      message.warning('请选择分类');
      return;
    }
    let res: any = await getVarInfo({
      categoryName: classType,
      categoryPath: treeName,
      searchType: 'all',
    });

    let varList: any = res?.data || [];

    let arr = selectedRowKeys?.filter((item: any) =>
      varList?.every((val: any) => val.featureCode == item),
    );
    let arr2 = selectList?.filter((item) =>
      varList?.every((val: any) => val.featureCode == item.featureCode),
    );

    setSelectList(arr2);
    setSelectedRowKeys([...arr]);
  };

  const selectAll = async () => {
    if (!classType) {
      message.warning('请选择分类');
      return;
    }
    console.log(classType);
    let res: any = await getVarInfo({
      categoryName: classType,
      categoryPath: treeName,
      searchType: 'all',
    });

    let varList: any = res?.data || [];

    let clearArr = selectedRowKeys?.filter((item: any) =>
      varList?.every((val: any) => val.featureCode == item),
    );
    let clearArr2 = selectList?.filter((item) =>
      varList?.every((val: any) => val.featureCode == item.featureCode),
    );

    let arr = varList.map((item: any) => {
      return item?.featureCode;
    });
    let arr2 = varList;
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
    getKeyVarInfo({
      page: 1,
      pageSize: 10,
      keyword: searchText1,
      searchMode: searchMode,
    });
  };

  // 选中
  const onSelect = (val: any, opt: any) => {
    console.log(val[0], opt);
    setTreeName(opt?.node?.title);
    setClassType(val[0]);
    if (!val[0]) {
      getKeyVarInfo({
        page: 1,
        pageSize: 10,
        keyword: searchText1,
        searchMode: searchMode,
      });
      return;
    }
    setSearchText1('');
    setCurrent1(1);
    getVarInfo({
      page: 1,
      pageSize: 10,
      categoryName: opt?.node?.title,
      categoryPath: val[0],
      searchType: '',
    });
  };

  // 勾选筛选设置
  const rowSelection = {
    preserveSelectedRowKeys: true,
    onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
      console.log(selectedRowKeys, selectedRows);
      setSelectedRowKeys(selectedRowKeys);
      setSelectList(selectedRows);
    },
  };

  useImperativeHandle(cref, () => ({
    open: (obj: any) => {
      getTreeList(info.id); // 获取faq列表
      setSelectedRowKeys(obj?.selectList?.map((item: any) => item.featureCode) || []);
      setSelectList(obj?.selectList || []);
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
    getKeyVarInfo({
      page: 1,
      pageSize: 10,
      keyword: searchText1,
      searchMode: searchMode,
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
                  onChange={setSearchMode}
                  value={searchMode}
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
                  ...rowSelection,
                  selectedRowKeys: selectedRowKeys,
                  hideSelectAll: false,
                }}
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
