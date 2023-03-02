import Condition from '@/components/Condition';
import { DeleteOutlined, MonitorOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Input, message, Modal, Space, Table, Tabs, Tooltip } from 'antd';
import { useEffect, useImperativeHandle, useMemo, useState } from 'react';
import { useModel } from 'umi';
import NextStepButton from '../../components/nextstep-button';
import { useStrategyBackModel, useStrategyBackUploadAwaitModel } from './model';
import style from './style.less';
import styles from '../style.less';
import { useNextStep } from '../../config';

const columns1: any[] = [
  {
    title: '编排名称',
    dataIndex: 'processName',
  },
];

const SelectorTable: React.FC<any> = (props: any) => {
  const { cref, confirm, type = 'checkbox', onNext, skip } = props;

  const { modelId } = useModel('step', (model: any) => ({
    modelId: model.modelId,
  }));

  //  批量相关操作

  const { tableList, loading, getStrategyTableList } = useStrategyBackModel();
  const { submitProcess, passBackStep } = useStrategyBackUploadAwaitModel();

  // ------------------------

  // 选中key值
  const [selectedKeys, setSelectedKeys] = useState<any[]>([]);

  // 勾选筛选设置
  const rowSelection = {
    preserveSelectedRowKeys: true,
    onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
      // 如果是单选
      // 设置选中数组
      setSelectedKeys(selectedRowKeys);
    },
    getCheckboxProps: (record: any) => {
      return {
        disabled: false,
        name: record.name,
      };
    },
  };

  // 查询数据库
  useEffect(() => {
    getStrategyTableList({ itmModelRegisCode: modelId }).then((res) => {
      if (res?.backtrackProcessName) {
        setSelectedKeys(res?.backtrackProcessName?.split(','));
      }
    });
  }, []);

  const onClick = async () => {
    console.log(selectedKeys);
    if (selectedKeys.length === 0) {
      message.warning('请选择需要回溯的编排');
    } else {
      console.log(selectedKeys);
      let reqData = { itmModelRegisCode: modelId, backtrackProcessName: selectedKeys?.join() };
      await submitProcess(reqData).then((res: any) => {
        if (res) {
          onNext?.(selectedKeys);
        }
      });
    }
  };

  const skipBackStep = () => {
    skip();
  };

  return (
    <div className={style['page-content']}>
      <div className={styles['step-tips']}>选择需要回溯的编排：</div>
      <div className={style['table-box']}>
        <Table
          rowSelection={{
            type: 'checkbox',
            ...rowSelection,
            selectedRowKeys: selectedKeys,
            // hideSelectAll: true,
          }}
          size="small"
          // pagination={false}
          dataSource={tableList}
          columns={columns1}
          rowKey="processName"
          loading={loading}
        />
      </div>

      <NextStepButton
        btnNode={
          <Space>
            <Button onClick={skipBackStep} size="large">
              跳过，下一流程
            </Button>
            <Button onClick={onClick} size="large" type="primary">
              提交
            </Button>
          </Space>
        }
      />
    </div>
  );
};

export default SelectorTable;
