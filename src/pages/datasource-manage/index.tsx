import Condition from '@/components/Condition';
import config from '@/config/index';
import useUpdateModel from '@/ models';
import { PlusOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import { Button, message, Popconfirm } from 'antd';
import React, { useEffect, useRef } from 'react';
import { history } from 'umi';

import { useTableModel, useOpModel } from './model';

import { listToMap, BUSSINESS_CODE } from './model/const';

enum MACHINE_STATUS {
  RUNNING = 0,
  STOP = 1,
}

// 机器人列表
const DataSourceManagement: React.FC = (props: any) => {
  // const { initialState, setInitialState } = useModel('@@initialState');

  const { tableList, getTableList, tableLoading } = useTableModel();

  const { opLoading, deleteDataSource, addNewDataSource } = useOpModel();

  // const { info, setInfo } = useModel('gundam' as any, (model: any) => ({
  //   info: model.info,
  //   setInfo: model.setInfo,
  // }));

  const { updatePage } = useUpdateModel();

  const tableRef = useRef<any>({});

  const modalRef = useRef<any>({});

  // 下钻系统
  const goToNewSystem = (row: any) => {
    if (!row.id) {
      message.warning('获取不到机器人ID');
      return null;
    }
    history.push(`/gundamPages/mainDraw?id=${row.id}`);
    localStorage.setItem('robot_id', row.id);
    sessionStorage.setItem('robot_id', row.id);
  };

  const deleteRow = async (row: any) => {
    if (row?.status == 0) {
      message.warning('请先停用该机器人');
      return;
    }

    let params: any = {
      id: row.id,
    };
    let res: any = await deleteDataSource(params);
    if (res) {
      console.log('删除接口');
      message.success('删除成功');
      tableRef.current.reload();
    } else {
      // message.error(res);
    }
  };

  const columns: any[] = [
    {
      title: '数据源名称',
      dataIndex: 'sourceName',
      fixed: 'left',
      fieldProps: {
        placeholder: '请输入数据源名称',
      },
      ellipsis: true,
      width: 180,
    },
    {
      title: '数据源类型',
      dataIndex: 'sourceType',
      fieldProps: {
        placeholder: '请选择数据源类型',
      },
      valueType: 'select',
      initialValue: undefined,
      valueEnum: {
        ...listToMap(BUSSINESS_CODE),
      },
      width: 120,
    },
    {
      title: '主机',
      dataIndex: 'ipaddress',
      search: false,
      valueEnum: {
        ...listToMap(BUSSINESS_CODE),
      },
      width: 120,
    },
    {
      title: '数据库名',
      dataIndex: 'databaseName',
      search: false,
      width: 200,
    },
    {
      title: '用户名',
      dataIndex: 'creator',
      search: false,
      width: 200,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      search: false,
      width: 200,
    },
    {
      title: '操作',
      dataIndex: 'op',
      search: false,
      fixed: 'right',
      width: 120,
      render: (val: any, row: any, index: number) => {
        return (
          <>
            <div style={{ display: 'flex' }}>
              <Popconfirm
                title="删除将不可恢复，确认删除？"
                okText="确定"
                cancelText="取消"
                onConfirm={() => {
                  deleteRow(row);
                }}
              >
                <Button type="link" danger>
                  删除
                </Button>
              </Popconfirm>
            </div>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    tableRef.current.reload();
  }, []);

  return (
    <div className={`list-page`}>
      <ProTable<any>
        // params={searchForm}
        columns={columns}
        actionRef={tableRef}
        scroll={{ x: columns.length * 200 }}
        request={async (params = {}, sort, filter) => {
          return getTableList({ page: params.current, ...params });
        }}
        editable={{
          type: 'multiple',
        }}
        columnsState={{
          persistenceKey: 'pro-table-machine-list',
          persistenceType: 'localStorage',
        }}
        rowKey="index"
        search={{
          labelWidth: 'auto',
          // optionRender: false,
          // collapsed: false,
        }}
        form={{
          // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
          // 查询参数转化
          syncToUrl: (values, type) => {
            if (type === 'get') {
              return {
                ...values,
              };
            }
            return values;
          },
        }}
        pagination={{
          pageSize: 10,
        }}
        dateFormatter="string"
        headerTitle=""
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => {
              modalRef.current?.open?.();
            }}
          >
            新建数据源
          </Button>,
        ]}
      />
    </div>
  );
};

export default DataSourceManagement;
