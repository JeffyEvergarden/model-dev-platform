import Condition from '@/components/Condition';
import { DownloadOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input, InputNumber, Select, Space, Table } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useModel } from 'umi';
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

  const [searchText, setSearchText] = useState<any>([]);
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchSelect = useRef<any>(null);
  const searchInputNumber = useRef<any>(null);

  const [selectReportList, setReportList] = useState<any[]>();

  const { loading, tableList, tableInfo, tableTotal, getLostList } = useExportReportModel();

  const { modelId } = useModel('step', (model: any) => ({
    modelId: model.modelId,
  }));
  const tbFilter = (dataIndex: any) => {
    return {
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }: any) => (
        <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
          <div style={{ display: 'flex' }}>
            <Select
              style={{ marginBottom: 8, flex: 1, marginRight: 6 }}
              ref={searchSelect}
              onChange={(val) => {
                if (selectedKeys[1]) {
                  setSelectedKeys([val, selectedKeys[1]]);
                  setSearchText([val, searchText[1]]);
                } else {
                  setSelectedKeys([val]);
                  setSearchText([val]);
                }
              }}
              placeholder={'请选择'}
              value={selectedKeys[0]}
            >
              <Select.Option key={'='} value={'='}>
                {'='}
              </Select.Option>
              <Select.Option key={'≠'} value={'!='}>
                {'≠'}
              </Select.Option>
              <Select.Option key={'>='} value={'>='}>
                {'>='}
              </Select.Option>
              <Select.Option key={'>'} value={'>'}>
                {'>'}
              </Select.Option>
              <Select.Option key={'<='} value={'<='}>
                {'<='}
              </Select.Option>
              <Select.Option key={'<'} value={'<'}>
                {'<'}
              </Select.Option>
            </Select>
            <InputNumber
              placeholder={'衡量值'}
              value={selectedKeys[1]}
              style={{ marginBottom: 8, flex: 1 }}
              precision={2}
              onChange={(val) => {
                setSelectedKeys([selectedKeys[0], val]);
                setSearchText([searchText[0], val]);
              }}
            ></InputNumber>
          </div>
          <Space>
            <Button
              type="link"
              size="small"
              onClick={() => {
                clearFilters();
                setSearchText([]);
              }}
              style={{ width: 90 }}
            >
              重置
            </Button>
            <Button
              size="small"
              style={{ width: 90 }}
              type="primary"
              onClick={() => {
                console.log(selectedKeys);
                confirm();
                setSearchText(selectedKeys);
                setSearchedColumn(dataIndex);
              }}
            >
              确定
            </Button>
          </Space>
        </div>
      ),
      onFilter: (value: any, record: any) => {
        console.log(searchText);

        if (searchText?.length && searchText[0]) {
          if (searchText[0] == '=') {
            return parseFloat(record[dataIndex]) == searchText[1];
          }
          if (searchText[0] == '!=') {
            return parseFloat(record[dataIndex]) != searchText[1];
          }
          if (searchText[0] == '>=') {
            return parseFloat(record[dataIndex]) >= searchText[1];
          }
          if (searchText[0] == '>') {
            return parseFloat(record[dataIndex]) > searchText[1];
          }
          if (searchText[0] == '<=') {
            return parseFloat(record[dataIndex]) <= searchText[1];
          }
          if (searchText[0] == '<') {
            return parseFloat(record[dataIndex]) < searchText[1];
          }
        }
        return record[dataIndex];
      },
    };
  };
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
      sorter: (a: any, b: any) => parseFloat(a.trainMissRate) - parseFloat(b.trainMissRate),
      ...tbFilter('trainMissRate'),
    },
    {
      title: '缺失率_valid',
      dataIndex: 'validMissRate',
      width: 200,
      sorter: (a: any, b: any) => parseFloat(a.validMissRate) - parseFloat(b.validMissRate),
      ...tbFilter('validMissRate'),
    },
    {
      title: 'KS_train',
      dataIndex: 'trainKs',
      width: 200,
      sorter: (a: any, b: any) => parseFloat(a.trainKs) - parseFloat(b.trainKs),
      ...tbFilter('trainKs'),
    },
    {
      title: 'KS_valid',
      dataIndex: 'validKs',
      width: 200,
      sorter: (a: any, b: any) => parseFloat(a.validKs) - parseFloat(b.validKs),
      ...tbFilter('validKs'),
    },
    {
      title: 'IV_train',
      dataIndex: 'trainIv',
      width: 200,
      sorter: (a: any, b: any) => parseFloat(a.trainIv) - parseFloat(b.trainIv),
      ...tbFilter('trainIv'),
    },
    {
      title: 'IV_valid',
      dataIndex: 'validIv',
      width: 200,
      sorter: (a: any, b: any) => parseFloat(a.validIv) - parseFloat(b.validIv),
      ...tbFilter('validIv'),
    },
    {
      title: 'PSI_train',
      dataIndex: 'trainPsi',
      width: 200,
      sorter: (a: any, b: any) => parseFloat(a.trainPsi) - parseFloat(b.trainPsi),
      ...tbFilter('trainPsi'),
    },
    {
      title: 'PSI_valid',
      dataIndex: 'validPsi',
      width: 200,
      sorter: (a: any, b: any) => parseFloat(a.validPsi) - parseFloat(b.validPsi),
      ...tbFilter('validPsi'),
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
      itmModelRegisCode: modelId,
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
                变量数量：
                <span className={style['titleSpan']}>{tableInfo?.variableNum ?? '-'}</span>
                <Divider type="vertical" />
                数值型：<span className={style['titleSpan']}>{tableInfo?.numTypeNum ?? '-'}</span>
                <Divider type="vertical" />
                类别型：<span className={style['titleSpan']}>{tableInfo?.otherTypeNum ?? '-'}</span>
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
