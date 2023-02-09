import React, { useEffect, useRef } from 'react';
import { Form, Input, DatePicker } from 'antd';
import styles from '../style.less';
import { useFormSelect } from './model';
import NextStepButton from '../../components/nextstep-button';

const FormItem = Form.Item;

const TextArea = Input.TextArea;

const { RangePicker }: any = DatePicker;

// 首页
const StepOne: React.FC = (props: any) => {
  // const { initialState, setInitialState } = useModel('@@initialState');

  const [form] = Form.useForm();

  const { getForm, postForm } = useFormSelect();

  // 初始化获取表单已填信息
  useEffect(() => {
    getForm('fate grand order');
  }, []);

  const submitNextStep = async () => {
    // console.log('---------');
    // ------------------------------
    let _form = await form.validateFields().then((obj) => {
      console.log(obj);
      return obj;
    });
    postForm(_form);
  };

  useEffect(() => {}, []);

  return (
    <div className={styles['step-page']}>
      <div className={styles['step-title']}>模型概况</div>

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
            <Input placeholder="请输入模型名称" maxLength={150} autoComplete="off" />
          </FormItem>

          <FormItem
            // rules={[{ required: true, message: '请输入节点描述' }]}
            name="targetDesc"
            label="模型开发目标"
            style={{ width: '600px' }}
          >
            <TextArea rows={4} placeholder="请输入模型开发目标" maxLength={150} />
          </FormItem>

          <FormItem
            name="modelPresentSituation"
            label="现有评分应用现状"
            style={{ width: '600px' }}
          >
            <TextArea rows={4} placeholder="请输入现有评分应用现状" maxLength={150} />
          </FormItem>

          <FormItem name="modelSceneThought" label="模型应用场景和思路" style={{ width: '600px' }}>
            <TextArea rows={4} placeholder="请输入模型应用场景和思路" maxLength={150} />
          </FormItem>

          <FormItem
            name="modelPerformanceMetrics"
            label="模型主要性能指标"
            style={{ width: '600px' }}
          >
            <TextArea rows={4} placeholder="请输入模型主要性能指标" maxLength={150} />
          </FormItem>

          <FormItem name="modelInnovation" label="模型主要创新点" style={{ width: '600px' }}>
            <TextArea rows={4} placeholder="请输入模型主要创新点" maxLength={150} />
          </FormItem>

          <FormItem name="modelDevTime" label="模型开发时间" style={{ width: '600px' }}>
            <RangePicker
              // format="YYYY-MM-DD"
              style={{ width: '400px' }}
              placeholder={['开始日期', '结束日期']}
              // showTime={false}
            ></RangePicker>
          </FormItem>

          <FormItem name="modelAnalyst" label="模型开发人" style={{ width: '400px' }}>
            <Input placeholder="模型开发人" maxLength={150} />
          </FormItem>

          <FormItem name="modelPolicyCounterpart" label="政策对接人" style={{ width: '400px' }}>
            <Input placeholder="政策对接人" maxLength={150} />
          </FormItem>
        </div>
      </Form>

      <NextStepButton onClick={submitNextStep} />
    </div>
  );
};

export default StepOne;
