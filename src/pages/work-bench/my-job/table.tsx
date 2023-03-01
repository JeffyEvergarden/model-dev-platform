import Condition from '@/components/Condition';
import config from '@/config/index';
import useUpdateModel from '@/models';
import { PlusOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import { Button, message, Popconfirm, Select, Space, Tag } from 'antd';
import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import { history, useModel } from 'umi';
import moment from 'moment';

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

  const { opLoading, deleteModel, exportData } = useOpModel();

  const [modelType, setModelType] = useState<any>(undefined);

  const { initialState } = useModel('@@initialState');

  const { setModelName } = useModel('step' as any, (model: any) => ({
    setModelName: model.setModelName,
  }));

  const { updatePage } = useUpdateModel();

  const tableRef = useRef<any>({});
  const formRef = useRef<any>({});
  const detailRef = useRef<any>({});

  const modalRef = useRef<any>({});

  useImperativeHandle(cref, () => ({
    setModelType: (val: any) => {
      formRef?.current?.setFieldsValue({
        modelStatus: val,
        creator: initialState?.currentUser?.userName || undefined,
      });
      formRef?.current?.submit();
    },
  }));

  const deleteRow = async (row: any) => {
    // if (row?.status == 0) {
    //   message.warning('请先停用');
    //   return;
    // }
    let parmas = {
      itmModelRegisCode: row?.itmModelRegisCode,
    };
    let res: any = await deleteModel(parmas);
    if (res) {
      console.log('删除接口');
      message.success('删除成功');
      tableRef.current.reload();
    } else {
      // message.error(res);
    }
  };

  const viewReport = (row: any) => {
    history.push(`/workBench/viewReport`);
  };

  const exportFile = (row: any) => {
    const paramData = {
      itmModelRegisCode: row?.itmModelRegisCode,
    };
    exportData(paramData).then((res: any) => {
      const _a = document.createElement('a');
      _a.download = `${row?.modelName}-${row?.itmModelRegisCode}.xlsx`;
      _a.href = URL.createObjectURL(res);
      const evt = document.createEvent('MouseEvents');
      evt.initEvent('click', false, false);
      _a.dispatchEvent(evt);

      // _a.click();
    });
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
      render: (val: any, row: any) => {
        if (row?.operate == 'scan') {
          return <span>{row?.modelName}</span>;
        } else {
          return (
            <a
              style={{ color: '#1890ff !important' }}
              onClick={() => {
                setModelName(row?.modelName || '');
                history?.push(`/modelStep/exportReport?id=${row?.itmModelRegisCode}`);
              }}
            >{`${row?.modelName}`}</a>
          );
        }
      },
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
      valueEnum: {
        ...listToMap(MODEL_STAGE),
      },
      width: 120,
      render: (_: any, record: any) => {
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
      initialValue: initialState?.currentUser?.userName || undefined,
      width: 200,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      hideInSearch: true,
      width: 200,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
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

              <Button type="text" className={style['btn-success']} onClick={() => exportFile(row)}>
                下载
              </Button>

              <Popconfirm
                title="删除将不可恢复，确认删除？"
                okText="确定"
                cancelText="取消"
                onConfirm={() => {
                  deleteRow(row);
                }}
                disabled={row?.operate == 'scan'}
              >
                <Button type="link" danger disabled={row?.operate == 'scan'}>
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
        form={{}}
        pagination={{
          pageSize: 10,
        }}
        dateFormatter="string"
        headerTitle=""
        toolBarRender={() => []}
      />

      <DetailModal cref={detailRef} />
    </div>
  );
};

export default ModelManagement;
