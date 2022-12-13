import React, { useEffect, useRef, useMemo } from 'react';
import { Form, Input, DatePicker, Row, Col, Radio, Button } from 'antd';
import styles from '../style.less';
import { useState } from 'react';
import Condition from '@/components/Condition';
import ProTable from '@ant-design/pro-table';
import { PlusOutlined } from '@ant-design/icons';
import { genColumns } from './model/config';
import { usePreAnalyzeModel, useSearchModel } from './model';

const FormItem = Form.Item;

const TextArea = Input.TextArea;

const { RangePicker }: any = DatePicker;

// 首页
const StepPreAnalyze: React.FC<any> = (props: any) => {
  // const { initialState, setInitialState } = useModel('@@initialState');
  const formRef = useRef<any>({});
  const [form] = Form.useForm();
  const tableRef = useRef<any>({});

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
  } = usePreAnalyzeModel();

  const {
    productList,
    channelMidList,
    channelSmList,
    setChannelMidList,
    setChannelSmList,
    getConditionList,
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

  useEffect(() => {
    getConditionList();
    // console.log(formRef);
  }, []);

  //

  const [vform] = Form.useForm();

  return (
    <div className={styles['step-page']}>
      <div className={styles['step-title']}>前期分析</div>

      <div>
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
          pagination={{
            pageSize: 10,
          }}
          dateFormatter="string"
          headerTitle="VINTAGE分析结果"
          toolBarRender={() => []}
        />
      </div>

      <Form form={vform} layout="vertical">
        <FormItem name="vcomment" label="VINTAGE分析结果" style={{ width: '100%' }}>
          <TextArea rows={4} placeholder="请输入VINTAGE分析结果" maxLength={150} />
        </FormItem>
      </Form>
    </div>
  );
};

export default StepPreAnalyze;
