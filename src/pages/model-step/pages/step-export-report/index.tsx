import React, { useState, useEffect, useRef } from 'react';
import { Form, Input, DatePicker, Row, Col, Radio, Button, Table, Select } from 'antd';
import styles from '../style.less';
import style from './style.less';
import Condition from '@/components/Condition';

import { useExportReportModel } from './model';
import { filterDropdown, filterData } from './filter';

const FormItem = Form.Item;
const Option = Select.Option;

const TextArea = Input.TextArea;

const { RangePicker }: any = DatePicker;

const optionlist: any = [
  {
    value: '=',
    label: '=',
  },
  {
    value: '!=',
    label: '!=',
  },
  {
    value: '>',
    label: '>',
  },
  {
    value: '<',
    label: '<',
  },
  {
    value: '>=',
    label: '>=',
  },
  {
    value: '<=',
    label: '<=',
  },
];

// 首页
const StepExportReport: React.FC<any> = (props: any) => {
  // const { initialState, setInitialState } = useModel('@@initialState');

  const [form] = Form.useForm();

  const [selectReportList, setReportList] = useState<any[]>();

  const { loading, tableList, tableTotal, getReportTableList } = useExportReportModel();

  const columns: any[] = [
    {
      title: '放款年月',
      dataIndex: 'month',
      filterMode: 'menu',
      width: 200,
    },
    {
      title: '好样本',
      dataIndex: 'goodNum',
      width: 200,
      filterMode: 'menu',
      filters: [],
      filterDropdown: filterDropdown('goodNum', optionlist),
      onFilter: (value: any, record: any) => {
        // console.log('onFilter', value, record);
        return filterData(value, record);
      },
    },
    {
      title: '坏样本',
      dataIndex: 'badNum',
      width: 200,
      filterDropdown: filterDropdown('badNum', optionlist),
      onFilter: (value: any, record: any) => {
        // console.log('onFilter', value, record);
        return filterData(value, record);
      },
    },
    {
      title: '总计',
      dataIndex: 'total',
      width: 200,
    },
  ];

  useEffect(() => {
    getReportTableList({});
  }, []);

  const tableChange = (pagination: any, filters: any, sorter: any, extra: any) => {
    console.log('tableChange-------');
    console.log(extra);
    setReportList(extra.currentDataSource);
  };

  return (
    <div className={styles['step-page']}>
      <div className={styles['step-title']}>生成报告</div>

      <div className={style['step-table']}>
        <Table
          pagination={false}
          dataSource={tableList}
          columns={columns}
          rowKey="month"
          loading={loading}
          onChange={tableChange}
        />
      </div>
    </div>
  );
};

export default StepExportReport;
