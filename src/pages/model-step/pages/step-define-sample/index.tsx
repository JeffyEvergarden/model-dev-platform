import React, { useEffect, useRef, useState } from 'react';
import { Form, Input, DatePicker, Row, Col, Radio, Button, Table, Space, message } from 'antd';
import styles from '../style.less';
import style from './style.less';
import { useDefineSampleModel } from './model';
import Condition from '@/components/Condition';
import { formatePercent } from '../utils/util';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import NextStepButton from '../../components/nextstep-button';
import TitleStatus from '../../components/title-status';
import { useModel } from 'umi';
import { useNextStep } from '../../config';
import { exportExcel } from './model/api';
import { getModelStepDetailApi } from '../../model/api';
import moment from 'moment';

const { Item: FormItem, List: FormList } = Form;

const TextArea = Input.TextArea;

const { RangePicker }: any = DatePicker;

const columns1: any[] = [
  // 问题列表-列
  {
    title: '放款年月',
    dataIndex: 'month',
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
    tableResultTotal,
    resultTableList,
    getSampleTableList,
    getResultTableList,
    nextFlow,
    nextLoading,
  } = useDefineSampleModel();
  const [form] = Form.useForm();
  // 页码, 分页相关
  const [current, setCurrent] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const [current2, setCurrent2] = useState<number>(1);
  const [pageSize2, setPageSize2] = useState<number>(10);

  const { nextStep } = useNextStep();

  const { modelId, isHadReported, operate } = useModel('step', (model: any) => ({
    modelId: model.modelId,
    isHadReported: model.isHadReported,
    operate: model.operate,
  }));

  // 切换分页
  const onChange = (val: any, ps: any) => {
    if (loading) {
      return;
    }
    getSampleTableList({ currentPage: val, pageSize: ps, itmModelRegisCode: modelId });
    setCurrent(val);
    setPageSize(ps);
  };

  const onResultChange = (val: any, ps: any) => {
    console.log(val, ps);
    if (loading) {
      return;
    }
    submit({ currentPage: val, pageSize: ps });
    setCurrent2(val);
    setPageSize2(ps);
  };
  useEffect(() => {
    getSampleTableList({
      currentPage: current,
      pageSize: pageSize,
      itmModelRegisCode: modelId,
    }).then((res) => {
      //回显整体
      form.setFieldsValue({
        trainingTime: [
          moment?.(res?.trainingTime?.startTime),
          moment?.(res?.trainingTime?.endTime),
        ],
        intertemporalTime: [
          moment?.(res?.intertemporalTime?.startTime),
          moment?.(res?.intertemporalTime?.endTime),
        ],
        other: res?.otherTimeList?.map((item: any) => [
          moment?.(item?.startTime),
          moment?.(item?.endTime),
        ]),
      });
    });
    getModelStepDetailApi({ stage: '5', itmModelRegisCode: modelId }).then((res) => {
      console.log(res);
    });
  }, []);

  const submit = async (obj: any) => {
    const submitObj: any = await form.validateFields().catch((e) => {
      return false;
    });
    console.log(submitObj);
    let flag = timeTest(submitObj);
    if (!flag) {
      message.warning('整体分布时间段不能重叠');
      return;
    }

    if (!submitObj) {
      return;
    }
    const newObj: any = {
      currentPage: obj.currentPage ? obj.currentPage : current2,
      pageSize: obj.pageSize ? obj.pageSize : pageSize2,
      itmModelRegisCode: modelId,
      trainingTime: submitObj?.trainingTime?.map?.((item: any) => item?.format?.('YYYY-MM-DD')),
      intertemporalTime: submitObj?.intertemporalTime?.map?.((item: any) =>
        item?.format?.('YYYY-MM-DD'),
      ),
      other: submitObj?.other?.map?.((item: any) => {
        return item?.map?.((subitem: any) => subitem?.format?.('YYYY-MM-DD'));
      }),
    };
    console.log(newObj);
    getResultTableList(newObj);
  };

  const exportResult = async () => {
    form.validateFields().then(async (value: any) => {
      if (value) {
        let flag = timeTest(value);
        if (!flag) {
          message.warning('整体分布时间段不能重叠');
          return;
        }
        let reqData = {
          itmModelRegisCode: modelId,
          // trainingTime: value?.trainingTime?.map?.((item: any) => item?.format?.('YYYY-MM-DD')),
          // intertemporalTime: value?.intertemporalTime?.map?.((item: any) =>
          //   item?.format?.('YYYY-MM-DD'),
          // ),
          // other: value?.other?.map?.((item: any) => {
          //   return item?.map?.((subitem: any) => subitem?.format?.('YYYY-MM-DD'));
          // }),
          trainingTime: {
            startTime: value?.trainingTime[0]?.format?.('YYYY-MM-DD'),
            endTime: value?.trainingTime[1]?.format?.('YYYY-MM-DD'),
          },
          intertemporalTime: {
            startTime: value?.intertemporalTime[0]?.format?.('YYYY-MM-DD'),
            endTime: value?.intertemporalTime[1]?.format?.('YYYY-MM-DD'),
          },
          otherTimeList: value?.other?.map?.((item: any) => {
            return {
              startTime: item?.[0]?.format?.('YYYY-MM-DD'),
              endTime: item?.[1]?.format?.('YYYY-MM-DD'),
            };
          }),
          sampleMonthDistributionList: tableList || [],
          sampleTotalDistributionList: resultTableList || [],
        };
        await exportExcel(reqData)
          .then((res) => {
            const blob: any = res;
            const reader = new FileReader(blob);
            reader.readAsDataURL(blob);
            reader.onload = (e: any) => {
              const a = document.createElement('a');
              a.download = `样本定义.${'xls'}`;
              a.href = e.target.result;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
            };
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  const _nextFlow = () => {
    form.validateFields().then((value: any) => {
      if (value) {
        let flag = timeTest(value);
        if (!flag) {
          message.warning('整体分布时间段不能重叠');
          return;
        }
        nextFlow({
          itmModelRegisCode: modelId,
          trainingTime: {
            startTime: value?.trainingTime[0]?.format?.('YYYY-MM-DD'),
            endTime: value?.trainingTime[1]?.format?.('YYYY-MM-DD'),
          },
          intertemporalTime: {
            startTime: value?.intertemporalTime[0]?.format?.('YYYY-MM-DD'),
            endTime: value?.intertemporalTime[1]?.format?.('YYYY-MM-DD'),
          },
          otherTimeList: value?.other?.map?.((item: any) => {
            return {
              startTime: item?.[0]?.format?.('YYYY-MM-DD'),
              endTime: item?.[1]?.format?.('YYYY-MM-DD'),
            };
          }),
          sampleMonthDistributionList: tableList || [],
          sampleTotalDistributionList: resultTableList || [],
        }).then((res) => {
          if (res) {
            nextStep();
          }
        });
      }
    });
  };

  const formListAdd = () => {
    let formData = form?.getFieldsValue();
    let formList = formData['other'];
    console.log(formData, formList);
    if (formList) {
      if (Array.isArray(formList)) {
        formList?.push([]);
      } else {
        formList = [[]];
      }
    } else {
      form.setFieldsValue({ other: [[]] });
      return;
    }
    console.log(formData);

    form.setFieldsValue({ ...formData });
  };

  const timeTest = (obj: any) => {
    let arr: any = [];
    Object.values(obj).forEach((item: any) => {
      if (!item) {
        return;
      }
      if (Array.isArray(item[0])) {
        item?.forEach((item: any) => {
          arr.push({
            s: item[0].startOf('day'),
            e: item[1].startOf('day'),
          });
        });
      } else {
        arr.push({
          s: item[0].startOf('day'),
          e: item[1].startOf('day'),
        });
      }
    });
    arr = arr.sort((a: any, b: any) => {
      return a.s - b.s;
    });
    let flag = arr.every((item: any, index: any) => {
      if (index > 0) {
        return item.s > arr[index - 1].e;
      } else {
        return true;
      }
    });
    console.log(flag);
    return flag;
  };

  return (
    <div className={styles['step-page']}>
      <div className={styles['step-title']}>
        <span>样本定义</span>
        <TitleStatus index={5}></TitleStatus>
      </div>

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
              // onShowSizeChange: (pn: any, ps: any) => {
              //   getSampleTableList({ itmModelRegisCode: modelId, currentPage: 1, pageSize: ps });
              //   setCurrent(1);
              //   setPageSize(ps);
              // },
            }}
            dataSource={tableList}
            columns={columns1}
            rowKey="month"
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

          <FormItem label="跨期验证范围">
            <Space align="baseline">
              <FormItem
                rules={[{ required: true, message: '请选择跨期验证范围' }]}
                name="intertemporalTime"
                noStyle
              >
                <RangePicker
                  placeholder={['开始日期', '结束日期']}
                  style={{ minWidth: '300px' }}
                ></RangePicker>
              </FormItem>
              <Button
                icon={<PlusCircleOutlined />}
                type="link"
                onClick={() => {
                  formListAdd();
                }}
              >
                添加验证范围
              </Button>
            </Space>
          </FormItem>

          <FormList name="other">
            {(fields, { add, remove }) => {
              const addNew = () => {
                let length = fields.length;
                add([], length);
              };

              let len = fields.length;

              return (
                <div>
                  {/* <div className={'ant-form-vertical'}>
                    <div className={'ant-col ant-form-item-label'}>
                      <label className={'ant-form-item-required'}>跨期验证范围</label>
                    </div>
                  </div> */}

                  {fields.map((field: any, index: number) => {
                    return (
                      <div key={index} className={style['inner-list-box']}>
                        <FormItem label={`其他验证${index + 1}范围`}>
                          <Space align="baseline">
                            <Form.Item
                              noStyle
                              name={[field.name]}
                              key={field.fieldKey}
                              fieldKey={[field.fieldKey]}
                              validateTrigger={['onChange', 'onBlur']}
                              rules={[
                                { required: true, message: '请选择' + `其他验证${index + 1}范围` },
                              ]}
                            >
                              <RangePicker
                                placeholder={['开始日期', '结束日期']}
                                style={{ minWidth: '300px' }}
                              ></RangePicker>
                            </Form.Item>
                            <Button
                              icon={<MinusCircleOutlined />}
                              type="link"
                              danger
                              onClick={() => {
                                console.log(len);
                                if (len == 1) {
                                  let formData = form.getFieldsValue();
                                  formData.other = undefined;
                                  console.log(formData);
                                  form.setFieldsValue({ ...formData });
                                } else {
                                  remove(index);
                                }
                              }}
                            />
                          </Space>
                        </FormItem>
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
            pagination={{
              current: current2,
              pageSize: pageSize2,
              onChange: onResultChange,
              total: tableResultTotal,
              showSizeChanger: true,
            }}
            dataSource={resultTableList}
            columns={columns2}
            rowKey="index"
            loading={resultLoading}
          />
        </div>
      </div>
      <Condition r-if={operate == 'EDIT' && !isHadReported}>
        <NextStepButton
          btnNode={
            <Space>
              <Button onClick={exportResult} size="large" loading={nextLoading}>
                导出结果
              </Button>
              <Button
                onClick={() => {
                  _nextFlow();
                }}
                size="large"
                type="primary"
                loading={nextLoading}
              >
                下一流程
              </Button>
            </Space>
          }
        />
      </Condition>
    </div>
  );
};

export default StepDefineSample;
