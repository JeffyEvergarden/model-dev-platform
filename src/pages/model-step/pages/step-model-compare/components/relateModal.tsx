import React, { useImperativeHandle, useState } from 'react';
import { Modal } from 'antd';
import { ProTable } from '@ant-design/pro-components';
import VarCodeRelateTable from '@/pages/model-step/components/varCodeRelateTable';
import styles from './index.less';
import classnames from 'classnames';

export default (props: any) => {
  const { cref, columnsRelate, dataSourceRelate } = props;

  useImperativeHandle(cref, () => ({
    open: (row: any) => {
      setVisible(true);
    },
    close: () => {
      setVisible(false);
    },
  }));

  const [visible, setVisible] = useState<boolean>(false);
  return (
    <Modal
      width={'100%'}
      title={''}
      visible={visible}
      onCancel={() => setVisible(false)}
      footer={null}
    >
      <div className={classnames(styles.comparePage, styles.modalPage)}>
        <div className={classnames(styles.tableBox, styles.relateTable)}>
          <VarCodeRelateTable
            headerTitle=""
            rowKey={(record: any) => record.id}
            toolBarRender={() => []}
            columns={columnsRelate}
            dataSource={dataSourceRelate}
          />
        </div>
      </div>
    </Modal>
  );
};
