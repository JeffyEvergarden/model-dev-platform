import { Spin } from 'antd';

export default () => {
  return (
    <Spin spinning={true} size="large">
      <div style={{ width: '100%', height: 'auto' }} />
    </Spin>
  );
};
