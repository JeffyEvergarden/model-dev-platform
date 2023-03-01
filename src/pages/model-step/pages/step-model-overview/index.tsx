import React, { useEffect, useState } from 'react';
import { Form, Input, DatePicker, message, Space, Button } from 'antd';
import styles from '../style.less';
import { useModel, history } from 'umi';
import { useFormSelect } from './model';
import { useNextStep } from '../../config';
import moment from 'moment';
import NextStepButton from '../../components/nextstep-button';
import TitleStatus from '../../components/title-status';
import { useSample } from './../step-select-sample/model/index';

import config from '@/config';
const successCode = config.successCode;

const FormItem = Form.Item;

const TextArea = Input.TextArea;

const { RangePicker }: any = DatePicker;

// 首页
const StepOne: React.FC = (props: any) => {
  // const { initialState, setInitialState } = useModel('@@initialState');

  const { modelId, doneStep, setDoneStep, isHadBuild, isHadReported } = useModel(
    'step',
    (model: any) => ({
      modelId: model.modelId,
      doneStep: model.doneStep,
      setDoneStep: model.setDoneStep,
      isHadBuild: model.isHadBuild,
      isHadReported: model.isHadReported,
    }),
  );

  // 表单是否可以编辑
  const isDisabled = isHadReported == '1' ? true : false;

  const [form] = Form.useForm();

  const { getForm, nextStage, saveInfo, loading } = useFormSelect();

  const [isSave, setIsSave] = useState<any>('-1');

  const { nextStep } = useNextStep();
  const { getCurrentStageRequest } = useSample();

  const _getForm = async () => {
    let res: any = await getForm(modelId);
    let modelDevTime = undefined;
    if (res) {
      try {
        modelDevTime = [res?.result?.modelDevStartTime, res.result?.modelDevEndTime];
        // 时间格式化
        if (
          typeof modelDevTime[0] === 'string' &&
          typeof modelDevTime[1] === 'string' &&
          res.result?.modelDevStartTime &&
          res.result?.modelDevEndTime
        ) {
          modelDevTime[0] = moment(modelDevTime[0]);
          modelDevTime[1] = moment(modelDevTime[1]);
          form.setFieldsValue({
            modelDevTime,
          });
        } else {
          form.setFieldsValue({
            modelDevTime: [],
          });
        }
      } catch (e) {
        console.log(e);
        console.warn('获取表单时间格式化错误');
      }
    }
    form.setFieldsValue({
      ...res?.result,
    });
  };

  // 初始化获取表单已填信息
  useEffect(() => {
    _getForm();
    getCurrentStage();
  }, []);

  const getCurrentStage = async () => {
    let res = await getCurrentStageRequest({ itmModelRegisCode: modelId });
    let data = res.result || {};
    setDoneStep(Number(data?.currentStage));
  };

  const submitNextStep = async (type: any) => {
    let _form = await form.validateFields();
    let modelDevTime = _form.modelDevTime;
    _form.modelDevStartTime = modelDevTime?.[0]?.format('YYYY-MM-DD');
    _form.modelDevEndTime = modelDevTime?.[1]?.format('YYYY-MM-DD');

    if (type == 'next') {
      let res = await nextStage({ itmModelRegisCode: modelId });
      // console.log(_form, res)
      if (res) {
        nextStep();
      }
    } else if (type == 'save') {
      let res = await saveInfo({ ..._form, itmModelRegisCode: modelId });
      if (res?.status?.code == successCode) {
        message.success(res?.status?.desc);
        setIsSave('1');
        // nextStep();
      } else {
        message.error(res?.status?.desc);
      }
    }
  };

  return (
    <div className={styles['step-page']}>
      <div className={styles['step-title']}>
        <span>模型概况</span>
        <TitleStatus index={1} />
      </div>

      <Form form={form} layout="vertical" labelAlign="right">
        <div className={styles['antd-form']}>
          <FormItem
            rules={[
              { required: true, message: '请输入模型名称' },
              {
                pattern: /^[A-Za-z0-9_\-\u4e00-\u9fa5]+$/g,
                message: '请输入汉字、字母、下划线、数字、横杠',
              },
            ]}
            name="modelName"
            label="模型名称"
            style={{ width: '400px' }}
          >
            <Input placeholder="请输入模型名称" maxLength={150} autoComplete="off" disabled />
          </FormItem>

          <FormItem
            rules={[{ required: true, message: '请输入模型开发目标' }]}
            name="modelDevTarget"
            label="模型开发目标"
            style={{ width: '600px' }}
          >
            <TextArea
              rows={4}
              placeholder="请输入模型开发目标"
              maxLength={150}
              disabled={isDisabled}
            />
          </FormItem>

          <FormItem
            rules={[{ required: true, message: '请输入现有评分应用现状' }]}
            name="modelPresentSituation"
            label="现有评分应用现状"
            style={{ width: '600px' }}
          >
            <TextArea
              rows={4}
              placeholder="请输入现有评分应用现状"
              maxLength={150}
              disabled={isDisabled}
            />
          </FormItem>

          <FormItem
            name="modelSceneThought"
            label="模型应用场景和思路"
            style={{ width: '600px' }}
            rules={[{ required: true, message: '请输入模型应用场景和思路' }]}
          >
            <TextArea
              rows={4}
              placeholder="请输入模型应用场景和思路"
              maxLength={150}
              disabled={isDisabled}
            />
          </FormItem>

          <FormItem
            name="modelPerformanceMetrics"
            label="模型主要性能指标"
            style={{ width: '600px' }}
            rules={[{ required: true, message: '请输入模型主要性能指标' }]}
          >
            <TextArea
              rows={4}
              placeholder="请输入模型主要性能指标"
              maxLength={150}
              disabled={isDisabled}
            />
          </FormItem>

          <FormItem
            name="modelInnovation"
            label="模型主要创新点"
            style={{ width: '600px' }}
            rules={[{ required: true, message: '请输入模型主要创新点' }]}
          >
            <TextArea
              rows={4}
              placeholder="请输入模型主要创新点"
              maxLength={150}
              disabled={isDisabled}
            />
          </FormItem>

          <FormItem
            name="modelDevTime"
            label="模型开发时间"
            style={{ width: '600px' }}
            rules={[{ required: true, message: '请选择模型开发时间' }]}
          >
            <RangePicker
              // format="YYYY-MM-DD"
              style={{ width: '400px' }}
              placeholder={['开始日期', '结束日期']}
              disabled={isDisabled}
              // showTime={false}
            />
          </FormItem>

          <FormItem
            name="modelAnalyst"
            label="模型开发人"
            style={{ width: '400px' }}
            rules={[{ required: true, message: '请输入模型开发人' }]}
          >
            <Input placeholder="模型开发人" maxLength={150} disabled />
          </FormItem>

          <FormItem
            name="modelPolicyCounterpart"
            label="政策对接人"
            style={{ width: '400px' }}
            rules={[{ required: true, message: '请输入政策对接人' }]}
          >
            <Input placeholder="政策对接人" maxLength={150} disabled={isDisabled} />
          </FormItem>
        </div>
      </Form>
      {/*当前阶段>=2的时候，下一流程可以去掉，只有保存按钮， <=1的是展示保存按钮和下一流程按钮 doneStep*/}
      {isDisabled == false && (
        <NextStepButton
          btnNode={
            <Space>
              <Button
                size="large"
                type="primary"
                disabled={isHadReported == '1'}
                onClick={() => submitNextStep('save')}
              >
                保存
              </Button>
              {(doneStep < 1 || doneStep == 1) && isSave == '1' && (
                <Button size="large" type="primary" onClick={() => submitNextStep('next')}>
                  下一流程{doneStep}
                </Button>
              )}
            </Space>
          }
          loading={loading}
        />
      )}
    </div>
  );
};

export default StepOne;
