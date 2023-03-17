import Condition from '@/components/Condition';
import { DownloadOutlined } from '@ant-design/icons';
import { ProTable } from '@ant-design/pro-components';
import { Button, Divider, Form, Input, InputNumber, message, Select, Space, Table } from 'antd';
import { useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useModel } from 'umi';
import { boxList, varList } from './config';
import { useExportReportModel } from './model';
import { lostExport } from './model/api';
import style from './style.less';

const MissingValueFilling: React.FC<any> = (props: any) => {
  const { cref } = props;
  const [form] = Form.useForm();
  const formData = Form.useWatch('numberFillType', form);
  const formData2 = Form.useWatch('categoryFillType', form);
  const formData3 = Form.useWatch('binningType', form);
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
    let arr = ['trainIv', 'validIv', 'validPsi'];
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
              precision={arr.includes(dataIndex) ? 4 : 2}
              controls={false}
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
      render: (v: any, r: any) => {
        let obj = {
          number: '数值',
          datetime: '日期',
          string: '字符',
          boolean: '布尔',
          list: '列表',
        };
        return obj[v];
      },
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
      title: 'PSI_valid',
      dataIndex: 'validPsi',
      width: 200,
      sorter: (a: any, b: any) => parseFloat(a.validPsi) - parseFloat(b.validPsi),
      ...tbFilter('validPsi'),
    },
  ];

  useImperativeHandle(cref, () => ({
    tableList,
  }));

  const tableChange = (pagination: any, filters: any, sorter: any, extra: any) => {
    console.log('tableChange-------');
    console.log(extra);
    setReportList(extra.currentDataSource);
  };

  const searchTable = () => {
    form.validateFields().then((values) => {
      if (!values) {
        return;
      }
      let formData: any = form.getFieldsValue();
      let reqData = {
        itmModelRegisCode: modelId,
        ...formData,
      };
      getLostList(reqData);
    });
  };

  const exportLost = async () => {
    if (!tableList?.length) {
      message.warning('列表暂无数据');
      return;
    }
    let reqData = {
      ...tableInfo,
    };
    await lostExport(reqData)
      .then((res) => {
        const blob: any = res;
        const reader = new FileReader(blob);
        reader.readAsDataURL(blob);
        reader.onload = (e: any) => {
          const a = document.createElement('a');
          a.download = `特征工程缺失值.${'xls'}`;
          a.href = e.target.result;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        };
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div style={{ fontWeight: 'bold', fontSize: '16px' }}>缺失值填充</div>
      <Form form={form}>
        <div className={style['form']}>
          <FormItem
            label={'数值型变量'}
            className={style['formItem']}
            name={'numberFillType'}
            rules={[{ required: true, message: '请选择' }]}
          >
            <Select
              placeholder={'请选择填充方式'}
              onChange={() => {
                console.log(formData);
              }}
              allowClear
            >
              {varList?.map((item) => (
                <Option key={item.label} value={item.label}>
                  {item.label}
                </Option>
              ))}
            </Select>
          </FormItem>
          <Condition r-if={formData == '自定义'}>
            <FormItem
              className={style['inputNumber']}
              name={'numberCustomValue'}
              rules={[{ required: true, message: '请选择' }]}
            >
              <InputNumber placeholder="请输入" controls={false}></InputNumber>
            </FormItem>
          </Condition>

          <FormItem
            label={'类别型变量'}
            className={style['formItem']}
            name={'categoryFillType'}
            rules={[{ required: true, message: '请选择' }]}
          >
            <Select placeholder={'请选择填充方式'} allowClear>
              {varList?.map(
                (item) =>
                  item.label == '自定义' && (
                    <Option key={item.label} value={item.label}>
                      {item.label}
                    </Option>
                  ),
              )}
            </Select>
          </FormItem>
          <Condition r-if={formData2 == '自定义'}>
            <FormItem
              className={style['inputNumber']}
              name={'categoryCustomValue'}
              rules={[{ required: true, message: '请选择' }]}
            >
              <Input placeholder="请输入"></Input>
            </FormItem>
          </Condition>

          <FormItem
            label={'分箱方式'}
            className={style['formItem']}
            name={'binningType'}
            rules={[{ required: true, message: '请选择' }]}
          >
            <Select placeholder={'请选择分箱方式'} allowClear>
              {boxList?.map((item) => (
                <Option key={item.label} value={item.label}>
                  {item.label}
                </Option>
              ))}
            </Select>
          </FormItem>

          <Condition r-if={formData3 == '等频分箱' || formData3 == '等距分箱'}>
            <FormItem
              className={style['inputNumber']}
              name={'binningNumber'}
              rules={[{ required: true, message: '请选择' }]}
            >
              <InputNumber max={20} placeholder="分箱个数" controls={false}></InputNumber>
            </FormItem>
          </Condition>
          <Button type="primary" onClick={searchTable}>
            确定
          </Button>
        </div>
      </Form>
      <div className={style['missingTable']}>
        <ProTable
          pagination={{ showSizeChanger: true }}
          dataSource={tableList}
          columns={columns}
          scroll={{ x: columns.length * 200 }}
          rowKey="variable"
          loading={loading}
          onChange={tableChange}
          toolBarRender={false}
          options={false}
          search={false}
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
              <Button type="link" icon={<DownloadOutlined />} onClick={exportLost}>
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
