import Condition from '@/components/Condition';
import {
  DeleteOutlined,
  MinusCircleOutlined,
  MonitorOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { Button, Input, message, Modal, Table, Tabs, Tooltip } from 'antd';
import { useEffect, useImperativeHandle, useMemo, useState } from 'react';
import { useModel } from 'umi';
import { useStepSelectModel } from '../../../step-select-sample/model';
import { useFaqModal } from '../../model';
import MyTree from '../my-tree';
import style from './style.less';

const { TabPane } = Tabs;

const { Search } = Input;

// selectlist  (recommendType、recommendId、recommend)
// disabledWishKeys    禁止选择的意图
// disabledQuestionKeys  禁止选择的问题
// selectedQuestionKeys  已选择的问题
// selectedWishKeys 已选择的意图

const SelectorModal: React.FC<any> = (props: any) => {
  const {
    cref,
    confirm,
    type = 'checkbox',
    min = 2,
    max = 5,
    readOnly = true,
    tableLoading = false,
    showQuestion = true,
    pageType,
    showOther = false,
    deleteQuestion = true,
  } = props;

  const [showWishKey, setShowWishKey] = useState<boolean>(true);
  // tabs 操作
  const [activeKey, setActivekey] = useState<string>('1');

  const [disabledQuestionKeys, setDisabledQuestionKeys] = useState<any[]>([]);
  const [disabledWishKeys, setDisabledWishKeys] = useState<any[]>([]);

  // title
  const [title, setTitle] = useState<any>('');

  // 对象
  const [selectList, setSelectList] = useState<any[]>([]);
  // const [selectWishList, setSelectWishList] = useState<any[]>([]);

  //  批量相关操作
  const [operation, setOperation] = useState<string>('');
  const [questionList, setQuestionList] = useState<any>([]);

  const info = { id: '100' };

  const { treeList, tableList, getTreeList, getTableList, total } = useStepSelectModel();

  const [classType, setClassType] = useState<string>('');
  const { loading, faqList, getFaqList, totalSize, setFaqList } = useFaqModal();

  const [visible, setVisible] = useState<boolean>(false);
  // 页码, 分页相关
  const [current1, setCurrent1] = useState<number>(1);

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
      dataIndex: 'question',
      width: 300,
    },
  ];

  // 切换分页
  const onChange1 = (val: any) => {
    if (loading) {
      return;
    }
    setCurrent1(val);
    if (classType) {
      getFaqList({
        page: val || 1,
        pageSize: 10,
      });
    } else {
      setFaqList([]);
    }
  };

  const clearSelect = () => {
    let arr = selectedQuestionKeys?.filter((item) =>
      faqList?.find((val) => val.id == item.recommendId),
    );
    let arr2 = selectList?.filter((item) => faqList?.find((val) => val.id == item));
    setSelectList(arr2);
    setSelectedQuestionKeys(arr);
  };

  const selectAll = () => {
    let clearArr = selectedQuestionKeys?.filter((item) =>
      faqList?.find((val) => val.id == item.recommendId),
    );
    let clearArr2 = selectList?.filter((item) => faqList?.find((val) => val.id == item));
    let arr = faqList.map((item) => {
      return item?.id;
    });
    let arr2 = faqList.map((item) => {
      return {
        recommendId: item.id,
        recommendName: item.question,
        recommendType: 1,
      };
    });

    setSelectList([...clearArr2, ...arr2]);
    setSelectedQuestionKeys([...clearArr, ...arr]);
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
    getFaqList({
      page: 1,
      pageSize: 10,
    });
  };

  // 选中key值
  const [selectedQuestionKeys, setSelectedQuestionKeys] = useState<any[]>([]);
  const [selectedWishKeys, setSelectedWishKeys] = useState<any[]>([]);

  // 选中
  const onSelect = (val: any) => {
    console.log(val[0]);
    if (!val[0]) {
      return;
    }
    setClassType(val[0]);
    setCurrent1(1);
    getFaqList({
      page: 1,
      pageSize: 10,
    });
  };

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
        // 设置选中数组
        setSelectedWishKeys([]);
        setSelectedQuestionKeys(selectedRowKeys);
        setSelectedWishKeys([]);
        return;
      }
      // 如果是多选
      // 新增
      if (selectedRowKeys.length > selectedQuestionKeys.length) {
        // 获取
        let lastInfo = selectedRows?.[selectedRows.length - 1];
        let arr = selectedRows
          ?.filter?.((item) => !selectedQuestionKeys?.find((val) => val == item?.id))
          .map((item) => ({
            recommendType: 1,
            recommendId: item.id,
            recommendName: item.question,
          }));
        if (lastInfo) {
          setSelectList([...selectList, ...arr]);
        }
        // 减小
      } else if (selectedRowKeys.length < selectedQuestionKeys.length) {
        // 找出少了那个
        let keys: any = selectedQuestionKeys.filter((_key: any) => {
          return !selectedRowKeys.includes(_key);
        });
        console.log('少了', keys);
        // 进行剔除  过滤出来
        let list: any[] = selectList?.filter((item: any) => {
          return !(item.recommendType === 1 && keys.includes(item.recommendId));
        });
        // console.log(selectedQuestionKeys, keys, list);
        setSelectList(list);
      }
      // 设置选中数组
      setSelectedQuestionKeys(selectedRowKeys);
    },
    getCheckboxProps: (record: any) => {
      return {
        disabled: disabledQuestionKeys.includes(record.id),
        name: record.name,
      };
    },
  };

  useImperativeHandle(cref, () => ({
    open: (obj: any) => {
      // getWishList(info.id); // 获取意图列表
      getTreeList(info.id); // 获取faq列表
      console.log(obj);
      if (obj.operation === 'batch') {
        setOperation('batch');
        setQuestionList(obj.questionList);
      } else {
        setOperation('');
        setQuestionList([]);
      }
      setTitle(obj.question || '');
      // 设置不能选的
      setDisabledWishKeys(obj?.disabledWishKeys || []);
      setDisabledQuestionKeys(obj?.disabledQuestionKeys || []);
      // 设置默认选中
      setSelectedQuestionKeys(obj?.selectedQuestionKeys || []);
      setSelectedWishKeys(obj?.selectedWishKeys || []);
      setSelectList(obj?.selectList || []);

      if (obj?.showFlow === false) {
        setShowWishKey(false);
        setActivekey('1');
        onChange1(1);
      } else {
        if (activeKey === '1') {
          onChange1(1);
        }
        setShowWishKey(true);
      }
      onSelect(['0']);
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
    if (!Array.isArray(selectList)) {
      message.warning('请选择有效的标准问/意图');
      return;
    }
    // ------------------
    if (type === 'checkbox') {
      // if (pageType == 'sampleDetail') {
      //   if (!((selectList.length >= min && selectList.length <= max) || selectList.length == 0)) {
      //     message.warning('请选择2-5项FAQ或意图用于澄清推荐问题');
      //     return;
      //   }
      // } else {
      // if (selectList.length < min || selectList.length > max) {
      // if (info.robotType == 1) {
      //   message.warning('请选择2项FAQ或意图用于澄清问题');
      // } else {
      //   message.warning('请选择2-5项FAQ或意图用于澄清推荐问题');
      // }
      //   return;
      // }
      // }
    }

    let res: any;
    if (operation == 'batch') {
      res = await confirm(selectList || [], questionList);
    } else {
      res = await confirm(selectList || [], title);
    }

    if (res) {
      setSearchText1('');
      setVisible(false);
    }
  };

  // 删除某个选项
  const deleteItem = (item: any, index: number) => {
    selectList.splice(index, 1);
    if (item.recommendType === 1) {
      let _selectedQuestionKeys = selectedQuestionKeys.filter((_item: any) => {
        return _item !== item.recommendId;
      });
      setSelectedQuestionKeys(_selectedQuestionKeys);
    } else {
      let _selectedWishKeys = selectedWishKeys.filter((_item: any) => {
        return _item !== item.recommendId;
      });
      setSelectedWishKeys(_selectedWishKeys);
    }
  };

  return (
    <Modal
      className={style['modal-bg']}
      width={950}
      title={'变量选择'}
      open={visible}
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
                  <Tooltip placement="topLeft" title={item.recommendName}>
                    <div className={style['label']}>
                      <span className={style['num']}>{index + 1}.</span>
                      {item.recommendName}
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
              <Search
                placeholder="输入搜索"
                value={searchText1}
                onSearch={onSearch1}
                onPressEnter={onSearch1}
                onChange={onSearchChange1}
                allowClear
                style={{ width: '300px' }}
              />
            </div>

            <div className={style['table-box']}>
              <Table
                rowSelection={{
                  type: type === 'radio' ? 'radio' : 'checkbox',
                  ...rowSelection,
                  selectedRowKeys: selectedQuestionKeys,
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
                dataSource={faqList}
                columns={columns1}
                rowKey="id"
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
