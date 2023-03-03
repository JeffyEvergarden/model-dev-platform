import { Card, Checkbox, Col, Divider, Pagination, Row, Select, Tooltip } from 'antd';
import { useEffect, useImperativeHandle, useState } from 'react';
import { useModel } from 'umi';
import { useExportReportModel } from '../../model';
import style from './style.less';

const VarCardList: React.FC<any> = (props: any) => {
  const { cref, selectVar } = props;
  const { Option } = Select;
  const { Meta } = Card;
  const [varType, setVarType] = useState<any>('');
  const { loading, varList, varTypeList, getVarTypeList, varTotal, getVarCardList } =
    useExportReportModel();
  const [page, setPage] = useState<any>(1);
  const [pageSize, setPageSize] = useState<any>(50);

  const { modelId } = useModel('step', (model: any) => ({
    modelId: model.modelId,
  }));

  useEffect(() => {
    getVarTypeList();
  }, []);

  useEffect(() => {
    selectVar();
  }, [varType]);

  useImperativeHandle(cref, () => ({
    getVarList: getList,
  }));

  const pageChange = (page: any, size: any) => {
    setPage(page);
    setPageSize(size);
  };

  const getList = (params: any) => {
    setPage(1);
    let reqData = {
      itmModelRegisCode: modelId,
      ...params,
    };
    getVarCardList(reqData, varType);
  };

  return (
    <div style={{ marginBottom: '16px' }}>
      <Card
        title={
          <div>
            <span style={{ marginRight: '6px' }}>变量类别：</span>
            <Select onChange={setVarType} style={{ width: '150px' }} defaultValue={''}>
              <Option key={'all'} value={''}>
                全部类别
              </Option>
              {varTypeList?.map((item) => (
                <Option key={item?.typeCode} value={item?.typeCode}>
                  {item?.typeName}
                </Option>
              ))}
            </Select>
          </div>
        }
      >
        <Checkbox.Group style={{ width: '100%' }} onChange={() => {}}>
          <Row gutter={[0, 16]}>
            {varList?.map?.((item: any, index: any) => {
              if (index >= (page - 1) * pageSize && index < page * pageSize)
                //分页
                return (
                  <Col span={4} key={index} style={{ marginRight: '3%' }}>
                    <Checkbox value={item?.variable} className={style['checkBoxText']}>
                      <Tooltip placement="topLeft" title={item?.variableName}>
                        {item?.variableName}
                      </Tooltip>
                    </Checkbox>
                  </Col>
                );
            })}
          </Row>
        </Checkbox.Group>
        <Divider />
        <Pagination
          size="small"
          showSizeChanger
          className={style['Pagination']}
          total={varTotal || 0}
          current={page}
          pageSize={pageSize}
          showTotal={(total, range) => `第 ${range[0]}-${range[1]} 条/总共 ${total} 条`}
          defaultPageSize={50}
          defaultCurrent={1}
          onChange={pageChange}
        />
      </Card>
    </div>
  );
};

export default VarCardList;
