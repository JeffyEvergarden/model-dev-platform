import React, { Fragment } from 'react';
import { Form, Select, InputNumber, Space } from 'antd';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import styles from './../../style.less';

const FormItem = Form.Item;
const { Option } = Select;

export default () => {
  const [goodform] = Form.useForm();
  return (
    <Form form={goodform}>
      <div className={styles.formListBox}>
        <FormItem
          name="listItem"
          label=""
          style={{ width: '330px' }}
          rules={[{ required: true, message: '请填写' }]}
        >
          <Select placeholder="请选择">
            <Select.Option key={'列表项1'} value={'列表项1'}>
              列表项1
            </Select.Option>
            <Select.Option key={'列表项2'} value={'列表项2'}>
              列表项2
            </Select.Option>
          </Select>
        </FormItem>
        <FormItem
          name="mark"
          label=""
          style={{ width: '100px' }}
          initialValue={'='}
          rules={[{ required: true, message: '请填写' }]}
        >
          <Select placeholder="请选择">
            <Select.Option key={'='} value={'='}>
              =
            </Select.Option>
            <Select.Option key={'≠'} value={'≠'}>
              ≠
            </Select.Option>
          </Select>
        </FormItem>
        <FormItem
          name="measures"
          label=""
          style={{ width: '100px' }}
          rules={[
            { required: true, pattern: new RegExp('^-?[1-9]d*$', 'g'), message: '衡量值为整数' },
          ]}
        >
          <InputNumber placeholder="衡量值" precision={0} />
        </FormItem>
      </div>
      <div>
        <Form.List name="ruleClips">
          {(fields, { add, remove }) => (
            <Fragment>
              <div>
                {fields.map(({ key, name, ...restField }, index) => (
                  <div key={index} className={styles.formListBox}>
                    <Form.Item
                      label={''}
                      name={[name, 'TF']}
                      initialValue={'and'}
                      rules={[{ required: true, message: '请选择' }]}
                      style={{ width: '100px' }}
                    >
                      <Select>
                        <Option key={'and'} value={'and'}>
                          and
                        </Option>
                        <Option key={'or'} value={'or'}>
                          or
                        </Option>
                        <Option key={'!'} value={'!'}>
                          !
                        </Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      label={''}
                      name={[name, 'listItem_s']}
                      rules={[{ required: true, message: '请选择' }]}
                      style={{ width: '330px' }}
                    >
                      <Select placeholder="请选择">
                        <Select.Option key={'列表项1'} value={'列表项1'}>
                          列表项1
                        </Select.Option>
                        <Select.Option key={'列表项2'} value={'列表项2'}>
                          列表项2
                        </Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      label={''}
                      name={[name, 'mark_s']}
                      initialValue={'='}
                      rules={[{ required: true, message: '请选择' }]}
                      style={{ width: '100px' }}
                    >
                      <Select placeholder="请选择">
                        <Select.Option key={'='} value={'='}>
                          =
                        </Select.Option>
                        <Select.Option key={'≠'} value={'≠'}>
                          ≠
                        </Select.Option>
                      </Select>
                    </Form.Item>
                    <FormItem
                      name={[name, 'measures_s']}
                      label=""
                      style={{ width: '100px' }}
                      rules={[{ required: true, message: '衡量值为整数' }]}
                    >
                      <InputNumber placeholder="衡量值" precision={0} />
                    </FormItem>
                    <MinusCircleOutlined
                      onClick={() => remove(index)}
                      style={{ marginBottom: '24px', color: 'rgba(24,144,255,1)' }}
                    />
                  </div>
                ))}
              </div>
              <div>
                <Form.Item label={''}>
                  <div
                    onClick={() =>
                      add(
                        {
                          TF: 'and',
                          listItem_s: '',
                          mark_s: '=',
                          measures_s: '',
                        },
                        fields.length,
                      )
                    }
                    style={{
                      color: 'rgba(24,144,255,1)',
                      cursor: 'pointer',
                      width: '200px',
                    }}
                  >
                    <Space>
                      <PlusCircleOutlined />
                      <span>添加筛选条件</span>
                    </Space>
                  </div>
                </Form.Item>
              </div>
            </Fragment>
          )}
        </Form.List>
      </div>
    </Form>
  );
};
