import Condition from '@/components/Condition';
import { DeleteOutlined, MonitorOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Empty, Input, message, Modal, Space, Table, Tabs, Tooltip } from 'antd';
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

  const { modelId, isHadBuild, isHadReported, operate } = useModel('step', (model: any) => ({
    modelId: model.modelId,
    isHadBuild: model.isHadBuild,
    isHadReported: model.isHadReported,
    operate: model.operate,
  }));

  //  批量相关操作

  const { tableList, loading, getStrategyTableList } = useStrategyBackModel();
  const { submitProcess, passBackStep } = useStrategyBackUploadAwaitModel();

  // ------------------------

  // 选中key值
  const [selectedKeys, setSelectedKeys] = useState<any[]>([]);

  const [submitLoading, setSubmitLoading] = useState<any>(false);

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
      setSubmitLoading(true);
      await submitProcess(reqData).then((res: any) => {
        setSubmitLoading(false);
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
      <div className={styles['step-tips']}>
        选择需要回溯的编排，将命中策略的数据从建模样本中剔除：
      </div>
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
          locale={{
            emptyText: (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={
                  '所选样本未迁移至新决策，无法关联trace_id进行策略回溯，将自动跳过这一流程'
                }
              />
            ),
          }}
        />
      </div>
      <Condition r-if={operate == 'EDIT' && !isHadBuild && !isHadReported}>
        <NextStepButton
          btnNode={
            <Space>
              <Button onClick={skipBackStep} size="large" loading={submitLoading}>
                跳过，下一流程
              </Button>
              <Button onClick={onClick} size="large" type="primary" loading={submitLoading}>
                提交
              </Button>
            </Space>
          }
        />
      </Condition>
    </div>
  );
};

export default SelectorTable;
