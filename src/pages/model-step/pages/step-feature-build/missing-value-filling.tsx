import Condition from '@/components/Condition';
import { DownloadOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input, Select, Space, Table } from 'antd';
import { useEffect, useState } from 'react';
import { useExportReportModel } from '../step-export-report/model';
import { boxList, varList } from './config';
import style from './style.less';

const MissingValueFilling: React.FC<any> = (props: any) => {
  const [form] = Form.useForm();
  const formData = Form.useWatch('number', form);
  const formData2 = Form.useWatch('type', form);
  const formData3 = Form.useWatch('box', form);
  const { Item: FormItem, List: FormList } = Form;
  const { Option } = Select;

  const [selectReportList, setReportList] = useState<any[]>();

  const { loading, tableList, tableTotal, getReportTableList } = useExportReportModel();

  const columns: any[] = [
    {
      title: '变量名称',
      dataIndex: 'month',
      width: 200,
      fixed: 'left',
    },
    {
      title: '中文名称',
      dataIndex: 'goodNum',
      width: 200,
      fixed: 'left',
    },
    {
      title: '变量类型',
      dataIndex: 'badNum',
      width: 200,
    },
    {
      title: '作为类别型',
      dataIndex: 'total',
      width: 200,
    },
    {
      title: '缺失率_train',
      dataIndex: 'month',
      width: 200,
    },
    {
      title: '缺失率_train',
      dataIndex: 'goodNum',
      width: 200,
    },
    {
      title: 'KS_train',
      dataIndex: 'badNum',
      width: 200,
    },
    {
      title: 'KS_valid',
      dataIndex: 'total',
      width: 200,
    },
    {
      title: 'IV_train',
      dataIndex: 'badNum',
      width: 200,
    },
    {
      title: 'IV_valid',
      dataIndex: 'total',
      width: 200,
    },
    {
      title: 'PSI_valid',
      dataIndex: 'total',
      width: 200,
    },
  ];

  const tableChange = (pagination: any, filters: any, sorter: any, extra: any) => {
    console.log('tableChange-------');
    console.log(extra);
    setReportList(extra.currentDataSource);
  };

  const searchTable = () => {
    getReportTableList({});
  };

  return (
    <div>
      <div style={{ fontWeight: 'bold', fontSize: '16px' }}>缺失值填充</div>
      <Form form={form}>
        <div className={style['form']}>
          <FormItem label={'数值型变量'} className={style['formItem']} name={'number'}>
            <Select
              placeholder={'请选择填充方式'}
              onChange={() => {
                console.log(formData);
              }}
              allowClear
            >
              {varList?.map((item) => (
                <Option key={item.value} value={item.value}>
                  {item.label}
                </Option>
              ))}
            </Select>
          </FormItem>
          <Condition r-if={formData == 4}>
            <FormItem className={style['inputNumber']} name={'inputNumber'}>
              <Input type={'number'} allowClear placeholder="请输入"></Input>
            </FormItem>
          </Condition>

          <FormItem label={'类别型变量'} className={style['formItem']} name={'type'}>
            <Select placeholder={'请选择填充方式'} allowClear>
              {varList?.map((item) => (
                <Option key={item.value} value={item.value}>
                  {item.label}
                </Option>
              ))}
            </Select>
          </FormItem>
          <Condition r-if={formData2 == 4}>
            <FormItem className={style['inputNumber']} name={'input'}>
              <Input allowClear placeholder="请输入"></Input>
            </FormItem>
          </Condition>

          <FormItem label={'分箱方式'} className={style['formItem']} name={'box'}>
            <Select placeholder={'请选择分箱方式'} allowClear>
              {boxList?.map((item) => (
                <Option key={item.value} value={item.value}>
                  {item.label}
                </Option>
              ))}
            </Select>
          </FormItem>

          <Condition r-if={formData3 == 1}>
            <FormItem className={style['inputNumber']} name={'boxinputNumber'}>
              <Input type={'number'} allowClear placeholder="分箱个数"></Input>
            </FormItem>
          </Condition>
          <Button type="primary" onClick={searchTable}>
            确定
          </Button>
        </div>
      </Form>
      <div className={style['missingTable']}>
        <Table
          // pagination={false}
          dataSource={tableList}
          columns={columns}
          scroll={{ x: columns.length * 200 }}
          rowKey="month"
          loading={loading}
          onChange={tableChange}
          title={() => (
            <div className={style['title']}>
              <div>
                变量数量：<span className={style['titleSpan']}>6,888</span>
                <Divider type="vertical" />
                数值型：<span className={style['titleSpan']}>4,888</span>
                <Divider type="vertical" />
                类别型：<span className={style['titleSpan']}>2,000</span>
              </div>
              <Button type="link" icon={<DownloadOutlined />}>
                下载
              </Button>
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default MissingValueFilling;
