import Condition from '@/components/Condition';
import config from '@/config/index';
import useUpdateModel from '@/models';
import { PlusOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import { Button, message, Popconfirm, Select, Space, Tag } from 'antd';
import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import { history } from 'umi';

import { useTableModel, useOpModel } from './model';

import {
  listToMap,
  MODEL_TYPE,
  MODEL_STAGE,
  MODEL_STATUS,
  STAGESTATUS_MAP,
  STAGESTATUS_COLOR_MAP,
} from './model/const';

import style from './style.less';
import DetailModal from './detail';

enum MACHINE_STATUS {
  RUNNING = 0,
  STOP = 1,
}

// 机器人列表
const ModelManagement: React.FC<any> = (props: any) => {
  // const { initialState, setInitialState } = useModel('@@initialState');
  const { cref } = props;

  const { tableList, getTableList, tableLoading, userList, getUserList } = useTableModel();

  const { opLoading, deleteModel, addNewModel } = useOpModel();

  const [modelType, setModelType] = useState<any>(undefined);

  // const { info, setInfo } = useModel('gundam' as any, (model: any) => ({
  //   info: model.info,
  //   setInfo: model.setInfo,
  // }));

  const { updatePage } = useUpdateModel();

  const tableRef = useRef<any>({});
  const formRef = useRef<any>({});
  const detailRef = useRef<any>({});

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

  useImperativeHandle(cref, () => ({
    setModelType: (val: any) => {
      formRef?.current?.setFieldsValue({
        modelStatus: val,
      });
      formRef?.current?.submit();
    },
  }));

  const deleteRow = async (row: any) => {
    if (row?.status == 0) {
      message.warning('请先停用该机器人');
      return;
    }

    let params: any = {
      id: row.id,
    };
    let res: any = await deleteModel(params);
    if (res) {
      console.log('删除接口');
      message.success('删除成功');
      tableRef.current.reload();
    } else {
      // message.error(res);
    }
  };

  const viewReport = (row: any) => {
    history.push('/workBench/viewReport');
  };

  const columns: any[] = [
    {
      title: '模型名称',
      dataIndex: 'modelName',
      fixed: 'left',
      fieldProps: {
        placeholder: '请输入模型名称',
      },
      ellipsis: true,
      width: 180,
    },
    {
      title: '模型单号',
      dataIndex: 'itmModelRegisCode',
      search: false,
      width: 200,
      ellipsis: true,
      render: (val: any, row: any) => {
        return val;
      },
    },
    {
      title: '模型编码',
      dataIndex: 'modelNo',
      search: false,
      width: 200,
      ellipsis: true,
    },
    {
      title: '模型类型',
      dataIndex: 'modelType',
      fieldProps: {
        placeholder: '请选择模型类型',
      },
      valueType: 'select',

      valueEnum: {
        ...listToMap(MODEL_TYPE),
      },
      width: 120,
    },
    {
      title: '当前阶段',
      dataIndex: 'currentStage',
      fieldProps: {
        placeholder: '请选择当前阶段',
      },
      valueType: 'select',
      initialValue: undefined,
      // valueEnum: {
      //   ...listToMap(MODEL_STAGE),
      // },
      width: 120,
      render: (_: any, record: any) => {
        console.log(_);

        return (
          <Space>
            {MODEL_STAGE?.find((item) => item.name == record?.currentStage)?.label}
            <Tag
              color={STAGESTATUS_COLOR_MAP[record?.currentStageStatus]}
              key={record?.currentStageStatus}
            >
              {STAGESTATUS_MAP[record?.currentStageStatus]}
            </Tag>
          </Space>
        );
      },
    },
    {
      title: '模型状态',
      dataIndex: 'modelStatus',
      fieldProps: {
        placeholder: '请选择模型状态',
      },
      // initialValue: modelType,
      valueEnum: {
        ...listToMap(MODEL_STATUS),
      },
      width: 120,
    },
    {
      title: '建模人员',
      dataIndex: 'creator',
      fieldProps: {
        placeholder: '请选择建模人员',
      },
      valueEnum: {
        ...listToMap(userList),
      },
      initialValue: '123',
      width: 200,
    },
    {
      title: '创建时间',
      dataIndex: 'createDate',
      hideInSearch: true,
      width: 200,
    },
    {
      title: '创建时间',
      dataIndex: 'createDate',
      valueType: 'dateRange',
      hideInTable: true,
      search: {
        transform: (value: any) => {
          return {
            beginDate: value[0],
            endDate: value[1],
          };
        },
      },
    },
    {
      title: '模型报告',
      dataIndex: 'report',
      search: false,
      fixed: 'right',
      width: 120,
      render: (val: any, row: any, index: number) => {
        return (
          <>
            <div style={{ display: 'flex' }}>
              <Button
                type="link"
                onClick={() => {
                  viewReport(row);
                }}
              >
                查看
              </Button>

              <Button type="text" className={style['btn-success']} onClick={() => {}}>
                下载
              </Button>

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
    {
      title: '操作',
      dataIndex: 'op',
      search: false,
      fixed: 'right',
      width: 50,
      render: (val: any, row: any, index: number) => {
        return (
          <>
            <div style={{ display: 'flex' }}>
              <Button
                type="text"
                className={style['btn-disable']}
                onClick={() => {
                  detailRef?.current?.open?.(row);
                }}
              >
                查看
              </Button>
            </div>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    console.log(tableRef);
    getUserList(); // 获取建模人员
    tableRef.current.reload();
  }, []);

  return (
    <div className={`${style['machine-page']} list-page`}>
      <ProTable<any>
        // params={searchForm}
        columns={columns}
        actionRef={tableRef}
        formRef={formRef}
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
          // <Button
          //   key="button"
          //   icon={<PlusOutlined />}
          //   type="primary"
          //   onClick={() => {
          //     modalRef.current?.open?.();
          //   }}
          // >
          //   新建
          // </Button>,
        ]}
      />

      <DetailModal cref={detailRef}></DetailModal>
    </div>
  );
};

export default ModelManagement;
