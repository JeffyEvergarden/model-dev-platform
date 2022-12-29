import { Card, Checkbox, Col, Divider, Pagination, Row, Select, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { useExportReportModel } from '../../model';
import style from './style.less';

const VarCardList: React.FC<any> = (props: any) => {
  const { Option } = Select;
  const { Meta } = Card;
  const [varType, setVarType] = useState<any>('');
  const { loading, tableList, tableTotal, getVarCardList } = useExportReportModel();
  const [page, setPage] = useState<any>(1);
  const [pageSize, setPageSize] = useState<any>(50);

  useEffect(() => {
    getVarCardList();
  }, []);

  const pageChange = (page: any, size: any) => {
    // console.log(page, size);
    setPage(page);
    setPageSize(size);
    getVarCardList({ page, pageSize: size });
  };
  return (
    <div style={{ marginBottom: '16px' }}>
      <Card
        title={
          <div>
            <span style={{ marginRight: '6px' }}>变量类别:</span>
            <Select onChange={setVarType} style={{ width: '150px' }} defaultValue={'1'}>
              <Option value={'1'}>全部类别</Option>
            </Select>
          </div>
        }
      >
        <Checkbox.Group style={{ width: '100%' }} onChange={() => {}}>
          <Row gutter={[0, 16]} justify={'space-between'}>
            {tableList?.map?.((item: any, index: any) => (
              <Col span={4} key={index} style={{ marginRight: '6px' }}>
                <Checkbox value={item?.name} className={style['checkBoxText']}>
                  <Tooltip placement="topLeft" title={item?.name}>
                    {item?.name}
                  </Tooltip>
                </Checkbox>
              </Col>
            ))}
          </Row>
        </Checkbox.Group>
        <Divider />
        <Pagination
          size="small"
          showSizeChanger
          className={style['Pagination']}
          total={tableTotal || 0}
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
