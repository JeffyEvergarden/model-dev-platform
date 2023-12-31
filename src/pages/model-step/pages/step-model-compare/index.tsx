import React, { useEffect, useRef, useState } from 'react';
import { Form, DatePicker, Space, Button, Tag, Tabs, Select, message } from 'antd';
import styles from '../style.less';
import { useModel, history } from 'umi';
import Condition from '@/components/Condition';
import ComparePage from './components/comparePage';
import NextStepButton from '../../components/nextstep-button';
import TitleStatus from '../../components/title-status';
import { useComparePage } from './model';
import { useExportReportModel } from '@/pages/model-step/pages/step-export-report/model';
import config from '@/config';
import { useNextStep } from '@/pages/model-step/config';
const successCode = config.successCode;
// 首页
const StepModelCompare: React.FC<any> = (props: any) => {
  const { loading, setLoading, versionListRequest, nextStageRequest } = useComparePage();

  const [form] = Form.useForm();

  const [tabList, setTabList] = useState<any>([]);
  const [activeKey, setActiveKey] = useState<any>('');

  const { getOptimalVersionRquest } = useExportReportModel();
  const { nextStep } = useNextStep();

  const { modelId, isHadReported, isReadonly } = useModel('step', (model: any) => ({
    modelId: model.modelId,
    isHadReported: model.isHadReported,
    isReadonly: model.isReadonly,
  }));

  // 表单是否可以编辑
  const isDisabled = isHadReported || isReadonly;

  useEffect(() => {
    getModelVersionList();
    getOptimalVersion();
  }, []);

  const getOptimalVersion = async () => {
    let params = {
      itmModelRegisCode: modelId,
    };
    let res = await getOptimalVersionRquest(params);
    if (res?.status?.code === successCode) {
      form.setFieldsValue({
        modelVersion: res?.result,
      });
    }
  };

  const getModelVersionList = async () => {
    let params = {
      itmModelRegisCode: modelId,
    };
    setLoading(true);
    let res = await versionListRequest(params);
    if (res?.status?.code === successCode) {
      setTabList(res?.result);
      setActiveKey(res?.result?.[0]?.value);
    } else {
      message.error(res?.status?.desc || '异常');
    }
  };

  const changeTab = (key: any) => {
    setActiveKey(key);
  };

  const nextFlow = async () => {
    const values = await form.validateFields();
    if (!values) {
      return;
    }
    let params = {
      itmModelRegisCode: modelId,
      modelVersion: values?.modelVersion,
    };
    setLoading(true);
    let res = await nextStageRequest(params);
    if (res?.status?.code == successCode) {
      setLoading(false);
      // history.push('/modelStep/exportReport');
      nextStep();
    } else {
      setLoading(false);
      message.error(res?.status?.desc);
    }
  };

  return (
    <div className={styles['step-page']}>
      <div className={styles['step-title']}>
        <span>模型对比</span>
        <TitleStatus index={9} />
      </div>
      <Tabs type="card" size="large" onChange={changeTab}>
        {tabList?.map((item: any) => {
          return (
            <Tabs.TabPane tab={item?.name} key={item?.value}>
              <ComparePage activeKey={activeKey ? activeKey : tabList?.[0]?.value} />
            </Tabs.TabPane>
          );
        })}
      </Tabs>
      <NextStepButton
        extra={
          <div className={styles.compareForm}>
            <Form form={form} layout="inline">
              <Form.Item
                label="选择最优模型"
                name="modelVersion"
                rules={[{ required: true, message: '请选择最优模型' }]}
              >
                <Select placeholder="请选择模型" style={{ width: '200px' }} allowClear>
                  {tabList?.map((item: any) => {
                    return (
                      <Select.Option key={item?.value} value={item?.value}>
                        {item?.name}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Form>
          </div>
        }
        btnNode={
          <Space>
            {!isDisabled && (
              <Button onClick={nextFlow} size="large" type="primary" loading={loading}>
                下一流程
              </Button>
            )}
          </Space>
        }
      />
    </div>
  );
};

export default StepModelCompare;
