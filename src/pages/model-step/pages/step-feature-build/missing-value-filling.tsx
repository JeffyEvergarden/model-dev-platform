import Condition from '@/components/Condition';
import { DownloadOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input, Select, Space, Table } from 'antd';
import { useEffect, useState } from 'react';
import { boxList, varList } from './config';
import { useExportReportModel } from './model';
import style from './style.less';

const MissingValueFilling: React.FC<any> = (props: any) => {
  const [form] = Form.useForm();
  const formData = Form.useWatch('numberFillType', form);
  const formData2 = Form.useWatch('categoryFillType', form);
  const formData3 = Form.useWatch('boxFillType', form);
  const { Item: FormItem, List: FormList } = Form;
  const { Option } = Select;

  const [selectReportList, setReportList] = useState<any[]>();

  const { loading, tableList, tableTotal, getLostList } = useExportReportModel();

  const columns: any[] = [
    {
      title: '变量名称',
      dataIndex: 'variable',
      width: 200,
      fixed: 'left',
    },
    {
      title: '中文名称',
      dataIndex: 'variableName',
      width: 200,
      fixed: 'left',
    },
    {
      title: '变量类型',
      dataIndex: 'variableType',
      width: 200,
    },
    {
      title: '缺失率_train',
      dataIndex: 'trainMissRate',
      width: 200,
    },
    {
      title: '缺失率_valid',
      dataIndex: 'validMissRate',
      width: 200,
    },
    {
      title: 'KS_train',
      dataIndex: 'trainKs',
      width: 200,
    },
    {
      title: 'KS_valid',
      dataIndex: 'validKs',
      width: 200,
    },
    {
      title: 'IV_train',
      dataIndex: 'trainIv',
      width: 200,
    },
    {
      title: 'IV_valid',
      dataIndex: 'validIv',
      width: 200,
    },
    {
      title: 'PSI_train',
      dataIndex: 'trainPsi',
      width: 200,
    },
    {
      title: 'PSI_valid',
      dataIndex: 'validPsi',
      width: 200,
    },
  ];

  const tableChange = (pagination: any, filters: any, sorter: any, extra: any) => {
    console.log('tableChange-------');
    console.log(extra);
    setReportList(extra.currentDataSource);
  };

  const searchTable = () => {
    console.log();
    let formData: any = form.getFieldsValue();
    let reqData = {
      itmModelRegisCode: '',
      ...formData,
    };
    getLostList(reqData);
  };

  return (
    <div>
      <div style={{ fontWeight: 'bold', fontSize: '16px' }}>缺失值填充</div>
      <Form form={form}>
        <div className={style['form']}>
          <FormItem label={'数值型变量'} className={style['formItem']} name={'numberFillType'}>
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
            <FormItem className={style['inputNumber']} name={'numberCustomValue'}>
              <Input type={'number'} allowClear placeholder="请输入"></Input>
            </FormItem>
          </Condition>

          <FormItem label={'类别型变量'} className={style['formItem']} name={'categoryFillType'}>
            <Select placeholder={'请选择填充方式'} allowClear>
              {varList?.map((item) => (
                <Option key={item.value} value={item.value}>
                  {item.label}
                </Option>
              ))}
            </Select>
          </FormItem>
          <Condition r-if={formData2 == 4}>
            <FormItem className={style['inputNumber']} name={'categoryCustomValue'}>
              <Input allowClear placeholder="请输入"></Input>
            </FormItem>
          </Condition>

          <FormItem label={'分箱方式'} className={style['formItem']} name={'boxFillType'}>
            <Select placeholder={'请选择分箱方式'} allowClear>
              {boxList?.map((item) => (
                <Option key={item.value} value={item.value}>
                  {item.label}
                </Option>
              ))}
            </Select>
          </FormItem>

          <Condition r-if={formData3 == 1 || formData3 == 2}>
            <FormItem className={style['inputNumber']} name={'boxinputNumber'}>
              <Input type={'number'} max={20} allowClear placeholder="分箱个数"></Input>
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
          rowKey="variable"
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
