import React, { useImperativeHandle, useState } from 'react';
import { Button, Modal, Space } from 'antd';

export default (props: any) => {
  const { cref, confirmSunmit, loading } = props;
  const [detail, setDetail] = useState<any>('');

  useImperativeHandle(cref, () => ({
    open: (resData: any) => {
      setVisible(true);
      setDetail(resData);
    },
    close: () => {
      setVisible(false);
    },
  }));

  const [visible, setVisible] = useState<boolean>(false);
  return (
    <Modal
      width={500}
      title={'运行代码如下'}
      visible={visible}
      centered
      onCancel={() => setVisible(false)}
      footer={
        <Space>
          <Button onClick={close}>取消</Button>
          <Button type="primary" onClick={confirmSunmit} disabled={loading}>
            确定
          </Button>
        </Space>
      }
    >
      <div style={{ minHeight: '300px', overflowY: 'auto' }}>{detail}</div>
    </Modal>
  );
};
