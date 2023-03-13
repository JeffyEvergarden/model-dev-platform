import Condition from '@/components/Condition';
import { CaretDownOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, message, Modal, Tooltip, Tree } from 'antd';
import React, { useEffect, useImperativeHandle, useState } from 'react';
import { useLocation } from 'react-router';
import style from './style.less';

interface TreeProps {
  cref: any;
  data: any[];
  onChange?: (...args: any) => void;
  touchChangeParent?: (...args: any) => void;
  deleteApi?: any;
  draggable: boolean;
  edit?: boolean;
  openEditModal?: (...args: any) => void;
  openAddModal?: (...args: any) => void;
  size?: string;
  selectTree?: any;
  leafClickOnly?: boolean;
  getTree?: any;
}

const { DirectoryTree } = Tree;
// tree 组件属性解释
// blockNode 是否节点占据一行

const MyTree: React.FC<TreeProps> = (props: TreeProps) => {
  const {
    cref,
    data,
    onChange,
    touchChangeParent,
    draggable,
    deleteApi = () => true,
    edit = true,
    size,
    getTree,
  } = props;

  const [dataSource, setDataSource] = useState<any[]>([]);
  const [defaultOpenTree, setDefaultOpenTree] = useState<any[]>([]);
  const [selectKey, setSelectKey] = useState<any>([]);

  const location: any = useLocation();

  const query: any = location?.query;

  useEffect(() => {
    setDataSource(data);
  }, [data]);

  // 选择节点
  const onSelect = (key: any, opt: any) => {
    let node = opt.node;
    console.log(key, opt);

    setSelectKey(key);
    onChange?.(key, opt);
  };
  // ----
  useImperativeHandle(cref, () => ({
    setSelectKey: () => {
      setSelectKey([]);
    },
  }));

  // 打开删除弹窗
  const openDeleteModal = (e: any, nodeData: any) => {
    console.log(nodeData);
    // 阻止冒泡
    e.stopPropagation();

    let parent: any = nodeData?.parent || undefined;

    Modal.confirm({
      icon: <ExclamationCircleOutlined />,
      content: '是否删除当前数据库？',
      onOk: async () => {
        console.log('删除');
        let res: any = await deleteApi();
        if (res) {
          message.success('删除成功');
          getTree();
          if (parent) {
            let arr: any[] = parent.children || [];
            let index: number = arr.findIndex((item: any) => item.key === nodeData.key);
            if (index > -1) {
              arr.splice(index, 1);
            }
          } else {
            let index: number = dataSource.findIndex((item: any) => item.key === nodeData.key);
            if (index > -1) {
              dataSource.splice(index, 1);
            }
          }
          setDataSource([...dataSource]);
        }
      },
      onCancel() {},
    });
  };

  // 自定义渲染
  const diyRender = (nodeData: any) => {
    // console.log(nodeData);

    let extra = null;

    const def = () => {
      if (!nodeData.parent) {
        return {
          display: 'block',
        };
      }
      return {};
    };

    return (
      <div className={style['tree-node']}>
        <div className={style['label']}>
          <div>{nodeData.title}</div>
        </div>
        <Condition r-if={edit}>
          <div className={style['edit-layout']} style={def()}>
            {nodeData.parent && !nodeData?.children?.length && (
              <Tooltip title={'删除当前分类'} placement={'top'}>
                <DeleteOutlined
                  style={{ fontSize: '12px' }}
                  onClick={(e) => {
                    openDeleteModal(e, nodeData);
                  }}
                />
              </Tooltip>
            )}
          </div>
        </Condition>
      </div>
    );
  };

  // ----
  const onClick = () => {
    console.log(dataSource);
  };

  return (
    <div className={`${style['faq-tree']} ${size === 'sm' ? style['faq-tree_sm'] : ''}`}>
      <Condition r-if={query?.test}>
        <div className={style['test-box']}>
          <Button type="primary" onClick={onClick}>
            输出树形结构
          </Button>
        </div>
      </Condition>

      <Condition r-if={dataSource?.length}>
        <Tree
          treeData={dataSource}
          switcherIcon={<CaretDownOutlined />}
          showLine
          showIcon={false}
          onSelect={onSelect}
          titleRender={diyRender}
          blockNode
          expandedKeys={defaultOpenTree}
          onExpand={(val: any) => {
            setDefaultOpenTree(val);
          }}
          selectedKeys={selectKey}
        ></Tree>
      </Condition>
    </div>
  );
};

export default MyTree;
