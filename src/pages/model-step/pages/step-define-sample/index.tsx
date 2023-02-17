import React, { useEffect, useRef, useState } from 'react';
import { Form, Input, DatePicker, Row, Col, Radio, Button, Table, Space } from 'antd';
import styles from '../style.less';
import style from './style.less';
import { useDefineSampleModel } from './model';
import Condition from '@/components/Condition';
import { formatePercent } from '../utils/util';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import NextStepButton from '../../components/nextstep-button';

const { Item: FormItem, List: FormList } = Form;

const TextArea = Input.TextArea;

const { RangePicker }: any = DatePicker;

const columns1: any[] = [
  // 问题列表-列
  {
    title: '放款年月',
    dataIndex: 'advMonth',
    width: 200,
  },
  {
    title: '好样本',
    dataIndex: 'goodSample',
    width: 200,
  },
  {
    title: '坏样本',
    dataIndex: 'badSample',
    width: 200,
  },
  {
    title: '总计',
    dataIndex: 'total',
    width: 200,
  },
  {
    title: '坏样本率',
    dataIndex: 'badRate',
    width: 200,
    // render: (val: any) => {
    //   return formatePercent(val);
    // },
  },
  {
    title: '中间样本',
    dataIndex: 'midSample',
    width: 200,
  },
  {
    title: '中间样本占比',
    dataIndex: 'midRate',
    width: 200,
    // render: (val: any) => {
    //   return formatePercent(val);
    // },
  },
];

const columns2: any[] = [
  {
    title: '样本类型',
    dataIndex: 'sampleType',
    width: 200,
  },
  {
    title: '好样本',
    dataIndex: 'goodSample',
    width: 200,
  },
  {
    title: '坏样本',
    dataIndex: 'badSample',
    width: 200,
  },
  {
    title: '总计',
    dataIndex: 'total',
    width: 200,
  },
  {
    title: '坏样本率',
    dataIndex: 'badRate',
    width: 200,
    // render: (val: any) => {
    //   return formatePercent(val);
    // },
  },
];

// 首页
const StepDefineSample: React.FC<any> = (props: any) => {
  // const { initialState, setInitialState } = useModel('@@initialState');

  const {
    loading,
    resultLoading,
    tableList,
    tableTotal,
    resultTableList,
    getSampleTableList,
    getResultTableList,
  } = useDefineSampleModel();

  // 页码, 分页相关
  const [current, setCurrent] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);

  // 切换分页
  const onChange = (val: any) => {
    if (loading) {
      return;
    }
    setCurrent(val);
  };

  useEffect(() => {
    getSampleTableList();
  }, []);

  // ------------

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      IntertemporalTime: [[]],
    });
  }, []);

  const submit = async () => {
    const submitObj: any = await form.validateFields().catch((e) => {
      return false;
    });
    console.log(submitObj);
    if (!submitObj) {
      return;
    }

    const newObj: any = {
      trainingTime: submitObj?.trainingTime?.map?.((item: any) => item?.format?.('YYYY-MM-DD')),
      IntertemporalTime: submitObj?.IntertemporalTime?.map?.((item: any) => {
        return item?.map?.((subitem: any) => subitem?.format?.('YYYY-MM-DD'));
      }),
    };
    console.log(newObj);

    getResultTableList(newObj);
  };

  const onNext = () => {
    console.log('下一个步骤');
  };

  const exportResult = () => {};

  const nextFlow = () => {};

  return (
    <div className={styles['step-page']}>
      <div className={styles['step-title']}>样本定义</div>

      <div className={styles['step-title_sec']}>按月份分布</div>

      <div className={styles['page-table']}>
        <div className={style['table-box']}>
          <Table
            pagination={{
              current: current,
              pageSize: pageSize,
              onChange: onChange,
              total: tableTotal,
              showSizeChanger: true,
              pageSizeOptions: [5, 10, 20],
              onShowSizeChange: (pn: any, ps: any) => {
                setCurrent(1);
                setPageSize(ps);
              },
            }}
            dataSource={tableList}
            columns={columns1}
            rowKey="advmonth"
            loading={loading}
          />
        </div>
      </div>

      <div className={styles['step-title_sec']} style={{ marginTop: '24px' }}>
        整体分布
      </div>

      <div className={style['step-form']}>
        <Form form={form} layout="vertical" labelAlign="right">
          <FormItem
            rules={[{ required: true, message: '请选择训练集范围' }]}
            name="trainingTime"
            label="训练集范围"
          >
            <RangePicker
              placeholder={['开始日期', '结束日期']}
              style={{ minWidth: '300px' }}
            ></RangePicker>
          </FormItem>

          <FormList name="IntertemporalTime">
            {(fields, { add, remove }) => {
              const addNew = () => {
                let length = fields.length;
                add([], length);
              };

              let len = fields.length;

              return (
                <div>
                  <div className={'ant-form-vertical'}>
                    <div className={'ant-col ant-form-item-label'}>
                      <label className={'ant-form-item-required'}>跨期验证范围</label>
                    </div>
                  </div>

                  {fields.map((field: any, index: number) => {
                    return (
                      <div key={field.key} className={style['inner-list-box']}>
                        <div>
                          <Form.Item
                            name={[field.name]}
                            key={field.fieldKey}
                            fieldKey={[field.fieldKey]}
                            validateTrigger={['onChange', 'onBlur']}
                            rules={[{ required: true, message: '请选择跨期验证范围' }]}
                          >
                            <RangePicker
                              placeholder={['开始日期', '结束日期']}
                              style={{ minWidth: '300px' }}
                            ></RangePicker>
                          </Form.Item>
                        </div>

                        <Condition r-if={len > 1}>
                          <Button
                            icon={<MinusCircleOutlined />}
                            type="link"
                            danger
                            onClick={() => {
                              remove(index);
                            }}
                          />
                        </Condition>
                        <Condition r-if={index === 0}>
                          <Button
                            icon={<PlusCircleOutlined />}
                            type="link"
                            onClick={() => {
                              addNew();
                            }}
                          />
                        </Condition>
                      </div>
                    );
                  })}
                </div>
              );
            }}
          </FormList>

          <Button type="primary" onClick={submit}>
            确定
          </Button>
        </Form>
      </div>

      <div className={styles['page-table']} style={{ paddingBottom: '16px' }}>
        <div className={style['table-box']}>
          <Table
            pagination={false}
            dataSource={resultTableList}
            columns={columns2}
            rowKey="month"
            loading={resultLoading}
          />
        </div>
      </div>

      <NextStepButton
        onClick={onNext}
        btnNode={
          <Space>
            <Button onClick={exportResult} size="large">
              导出结果
            </Button>
            <Button onClick={nextFlow} size="large" type="primary">
              下一流程
            </Button>
          </Space>
        }
      />
    </div>
  );
};

export default StepDefineSample;
