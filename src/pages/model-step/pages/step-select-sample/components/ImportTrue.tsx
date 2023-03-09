import React, { Fragment, useEffect } from 'react';
import { Form, Input, Select, Button, Row, Col } from 'antd';
import NextStepButton from './../../../components/nextstep-button';

const FormItem = Form.Item;

export default (props: any) => {
  const { form, onNext, editData, loading } = props;

  useEffect(() => {
    form.setFieldsValue({
      businessType: editData?.businessType,
      tableName: editData?.tableName,
      dimensionField: editData?.dimensionField,
    });
  }, [editData]);

  const onClick = async () => {
    let val = await form.validateFields();
    onNext?.(val);
  };

  return (
    <Fragment>
      <Form form={form} layout={'vertical'}>
        <Row gutter={12}>
          <Col span={8}>
            <FormItem
              label={'数据维度'}
              name="businessType"
              rules={[{ required: true, message: '请选择数据维度' }]}
            >
              <Select placeholder="请选择数据维度">
                <Select.Option value={'SX'}>进件层</Select.Option>
              </Select>
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem
              label={'表名称'}
              name="tableName"
              rules={[{ required: true, message: '请输入导入表名称' }]}
            >
              <Input placeholder="请输入导入表名称" />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem
              label={'表字段'}
              name="dimensionField"
              rules={[{ required: true, message: '请输入导入字段名称' }]}
            >
              <Input placeholder="请输入导入字段名称" />
            </FormItem>
          </Col>
        </Row>
      </Form>
      <NextStepButton onClick={onClick} text={'提交'} loading={loading} />
    </Fragment>
  );
};
