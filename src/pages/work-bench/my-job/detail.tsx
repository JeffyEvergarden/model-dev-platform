import { Modal, Table } from 'antd';
import React, { useImperativeHandle, useState } from 'react';
import { useTableModel } from './model';
import { MODEL_STAGE } from './model/const';
import style from './style.less';

const DetailModal: React.FC<any> = (props: any) => {
  const [visible, setVisible] = useState<any>(false);
  const [title, setTitle] = useState<any>('评分表');
  // const { InfoList, getItemInfo, infoLoading } = useTableModel();
  const [infoList, setInfoList] = useState<any>([]);

  const { cref } = props;
  const columns: any[] = [
    // 问题列表-列
    {
      title: '数据集',
      dataIndex: 'tableName',
    },
    {
      title: '存放库',
      dataIndex: 'database',
      width: 200,
    },
    {
      title: '生成阶段',
      dataIndex: 'modelStage',
      width: 200,
      // render: (_: any, record: any) => {
      //   return MODEL_STAGE?.find((item: any) => item.name == record?.modelStage)?.label;
      // },
    },
  ];
  useImperativeHandle(cref, () => ({
    open: open,
  }));
  const open = (row: any) => {
    setVisible(true);
    setTitle(`${row?.modelName}评分卡`);
    setInfoList(row?.hiveTableInfo || []);
  };
  return (
    <Modal
      title={title}
      width={800}
      visible={visible}
      onCancel={() => {
        setVisible(false);
      }}
      footer={false}
    >
      <Table
        size="small"
        pagination={{ pageSize: 20 }}
        scroll={{ y: 500 }}
        dataSource={infoList}
        columns={columns}
        rowKey="tableName"
      />
    </Modal>
  );
};

export default DetailModal;
