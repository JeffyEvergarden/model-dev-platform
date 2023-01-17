import React, { useEffect, useRef, useMemo, useState, Fragment } from 'react';
import { Form, Input, DatePicker, Divider, Select, InputNumber, Space } from 'antd';
import styles from '../style.less';
import Condition from '@/components/Condition';
import ProTable from '@ant-design/pro-table';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { genColumns } from './model/config';
import { usePreAnalyzeModel, useSearchModel } from './model';
import config from '@/config/index';

const FormItem = Form.Item;
const TextArea = Input.TextArea;
const { Option } = Select;

const { RangePicker }: any = DatePicker;

// 首页
const StepPreAnalyze: React.FC<any> = (props: any) => {
  // const { initialState, setInitialState } = useModel('@@initialState');
  const formRef = useRef<any>({});
  const [form] = Form.useForm();
  const tableRef = useRef<any>({});
  const rateRef = useRef<any>({});

  const [rateColumns, setRateColumns] = useState<any[]>([]);
  const [yearMonth, setYearMonth] = useState<any[]>([]);
  const [useTimeData, setUseTimeData] = useState<any>('');
  const [limitTimeData, setLimitTimeData] = useState<any>('');
  // vintage 分析
  const {
    vloading,
    vintageList,
    vintageTotal,
    getVintageList,
    vColumns,
    // -------
    sloading,
    scrollList,
    scrollTotal,
    getScrollList,
    sColumns,

    getRateList,
  } = usePreAnalyzeModel();

  const {
    productList,
    channelMidList,
    channelSmList,
    setChannelMidList,
    setChannelSmList,
    getConditionList,
    getYaerMonthRequest,
    originChannelMidList,
    originChannelSmList,
  } = useSearchModel();

  const changeProductClass = (val: any) => {
    if (val) {
      let item: any = productList.find((item) => item.name === val);
      let list: any[] = item.children || [];
      let subList: any[] = [];
      list.forEach((subitem) => {
        if (subitem.children) {
          subList.push(...subitem.children);
        }
      });
      setChannelMidList(list);
      setChannelSmList(subList);
    } else {
      // 参数置空
      setChannelMidList(originChannelMidList);
      setChannelSmList(originChannelSmList);
    }
    (formRef.current as any).setFieldsValue({
      channelMidClass: undefined,
      channelSmClass: undefined,
    });
  };

  const changeChannelMid = (val: any) => {
    const formVal: any = (formRef.current as any).getFieldsValue();
    const _val = formVal?.productClass;
    if (val) {
      let item: any = channelMidList.find((item) => item.name === val);
      let list: any[] = item.children || [];
      setChannelSmList(list);
    } else {
      if (_val) {
        // 如果一级筛选有值
        let item: any = productList.find((item) => item.name === _val);
        let list: any[] = item?.children || [];
        let subList: any[] = [];
        list.forEach((subitem) => {
          if (subitem.children) {
            subList.push(...subitem.children);
          }
        });
        setChannelSmList(subList);
      } else {
        setChannelSmList(originChannelSmList);
      }
    }
    (formRef.current as any).setFieldsValue({
      channelSmClass: undefined,
    });
  };

  const _vcolumns = useMemo(
    () =>
      genColumns(vColumns, {
        productList,
        channelMidList,
        channelSmList,
        changeProductClass,
        changeChannelMid,
      }),
    [vColumns, productList, channelMidList, channelSmList],
  );

  const onSelect = (val: any, type: string) => {
    if (type === 'useTime') {
      if (val !== '') {
        let temp = [...useTimeData];
        temp = temp.filter((item: any) => item !== '');
        temp.push(val);
        setUseTimeData(temp);
      } else if (val == '') {
        setUseTimeData('');
      }
    } else if (type === 'limitTime') {
      if (val !== '') {
        let temp = [...limitTimeData];
        temp = temp.filter((item: any) => item !== '');
        temp.push(val);
        setLimitTimeData(temp);
      } else if (val == '') {
        setLimitTimeData('');
      }
    }
  };

  const onDeselect = (val: any, type: string) => {
    let temp = [...useTimeData];
    temp = temp.filter((item: any) => item !== val);
    if (type === 'useTime') {
      setUseTimeData(temp);
    } else if (type === 'limitTime') {
      setLimitTimeData(temp);
    }
  };

  const getRateColumns = (extra: any[]) => {
    let _columns: any[] = [
      {
        title: '用款年月',
        dataIndex: 'useTime',
        hideInTable: true,
        renderFormItem: (t: any, r: any, i: any) => {
          return (
            <Select
              style={{ maxWidth: '400px', minWidth: '120px' }}
              onSelect={(val) => onSelect(val, 'useTime')}
              onDeselect={(val) => onDeselect(val, 'useTime')}
              mode="multiple"
              allowClear
              maxTagCount={2}
              value={useTimeData}
            >
              <Option key={''} value="">
                全选
              </Option>
              {yearMonth.map((item: any) => {
                return (
                  <Option key={item.value} value={item.value}>
                    {item.value}
                  </Option>
                );
              })}
            </Select>
          );
        },
      },
      {
        title: '贷款期限',
        dataIndex: 'limitTime',
        hideInTable: true,
        renderFormItem: (t: any, r: any, i: any) => {
          return (
            <Select
              style={{ maxWidth: '400px', minWidth: '120px' }}
              onSelect={(val) => onSelect(val, 'limitTime')}
              onDeselect={(val) => onDeselect(val, 'limitTime')}
              mode="multiple"
              allowClear
              maxTagCount={2}
              value={limitTimeData}
            >
              <Option key={''} value="">
                全选
              </Option>
              {yearMonth.map((item: any) => {
                return (
                  <Option key={item.value} value={item.value}>
                    {item.value}
                  </Option>
                );
              })}
            </Select>
          );
        },
      },
      {
        title: '数据维度',
        dataIndex: 'dataDimension',
        fieldProps: {
          placeholder: '请选择数据维度',
        },
        valueType: 'select',
        valueEnum: {
          账户层: '账户层',
          借据层: '借据层',
        },
        hideInTable: true,
      },
      {
        title: '汇总指标',
        dataIndex: 'summary',
        fieldProps: {
          placeholder: '请选择数据维度',
        },
        valueType: 'select',
        valueEnum: {
          账户数: '账户数',
          金额: '金额',
        },
        hideInTable: true,
      },
    ];
    return [..._columns, ...extra];
  };

  const _rateColumns = useMemo(
    () => getRateColumns(rateColumns),
    [rateColumns, yearMonth, useTimeData, limitTimeData],
  );

  useEffect(() => {
    getConditionList();
    // console.log(formRef);
    getYaerMonth();
  }, []);

  const getYaerMonth = async () => {
    let params = {};
    let res = await getYaerMonthRequest(params);
    setYearMonth(res?.data);
  };

  const [vform] = Form.useForm();
  const [rateform] = Form.useForm();
  const [analysisform] = Form.useForm();
  const [goodform] = Form.useForm();

  const getRateListArr = async (payLoad: any) => {
    let res = await getRateList(payLoad);
    if (res.resultCode === config.successCode) {
      let data: any[] = res.data || [];
      let columns: any[] = res.columns || [];
      let total = res.total || 0;
      columns = columns.map((item: any) => {
        return {
          ...item,
          title: item.label,
          dataIndex: item.key,
          search: false,
          ellipsis: true,
          width: 120,
          filters:
            item.label === '本期状态'
              ? [
                  {
                    text: 'M0',
                    value: 'M0',
                  },
                  {
                    text: 'M1',
                    value: 'M1',
                  },
                ]
              : null,
        };
      });
      setRateColumns(columns);
      return {
        data,
        total,
      };
    } else {
      return {
        data: [],
        total: 0,
      };
    }
  };

  return (
    <div className={styles['step-page']}>
      <div className={styles['step-title']}>前期分析</div>
      <p className={styles.commonTitle}>VINTAGE分析</p>
      <div className={styles.commonTable}>
        <ProTable<any>
          // params={searchForm}
          columns={_vcolumns}
          actionRef={tableRef}
          loading={vloading}
          // scroll={{}}
          request={async (params = {}, sort, filter) => {
            return getVintageList({ page: params.current, ...params });
          }}
          editable={{
            type: 'multiple',
          }}
          columnsState={{
            persistenceKey: 'pro-table-pre-analyze-list',
            persistenceType: 'localStorage',
          }}
          rowKey="index"
          search={{
            labelWidth: 'auto',
            // optionRender: false,
            // collapsed: false,
          }}
          formRef={formRef}
          form={{
            // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
            // 查询参数转化
            syncToUrl: (values, type) => {
              console.log(values, type);
              if (type === 'get') {
                return {
                  ...values,
                };
              }
              return values;
            },
          }}
          pagination={false}
          dateFormatter="string"
          headerTitle="VINTAGE分析结果"
          toolBarRender={() => []}
          options={false}
        />
      </div>

      <Form form={vform} layout="vertical">
        <FormItem name="vcomment" label="VINTAGE分析结果" style={{ width: '100%' }}>
          <TextArea rows={4} placeholder="请输入VINTAGE分析结果" maxLength={150} />
        </FormItem>
      </Form>
      <Divider />
      <p className={styles.commonTitle}>滚动率分析</p>
      <div className={styles.commonTable}>
        <ProTable
          actionRef={rateRef}
          headerTitle="滚动率分析结果"
          rowKey={(r) => r.key}
          toolBarRender={() => []}
          options={{ density: false, fullScreen: false, reload: false, setting: true }}
          search={{
            labelWidth: 'auto',
            // optionRender: false,
            // collapsed: false,
          }}
          pagination={false}
          columns={_rateColumns}
          request={async (params = {}, sort, filter) => {
            return getRateListArr({ page: params.current, ...params });
          }}
        />
      </div>
      <Form form={analysisform} layout="vertical">
        <FormItem name="vcomment" label="滚动率分析结论" style={{ width: '100%' }}>
          <TextArea rows={4} placeholder="请输入滚动率分析结论" maxLength={150} />
        </FormItem>
      </Form>
      <Divider />
      <p className={styles.commonTitle}>经分析，将好坏客户定义设置为：</p>
      <div className={styles.commonLabel}>好客户定义</div>
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
    </div>
  );
};

export default StepPreAnalyze;
