import React, { useImperativeHandle, useState } from 'react';
import { Modal } from 'antd';
import { ProTable } from '@ant-design/pro-components';
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
      open={visible}
      onCancel={() => setVisible(false)}
      footer={null}
    >
      <div className={classnames(styles.comparePage, styles.modalPage)}>
        <div className={classnames(styles.tableBox, styles.relateTable)}>
          <ProTable
            headerTitle=""
            rowKey={(record: any) => record.id}
            toolBarRender={() => []}
            options={false}
            bordered
            pagination={false}
            search={false}
            columns={columnsRelate}
            dataSource={dataSourceRelate}
            scroll={{
              x: columnsRelate?.length * 150,
              y: dataSourceRelate?.length > 10 ? 200 : undefined,
            }}
          />
        </div>
      </div>
    </Modal>
  );
};
