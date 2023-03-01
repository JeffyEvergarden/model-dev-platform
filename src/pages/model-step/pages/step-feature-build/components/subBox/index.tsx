import { DownloadOutlined } from '@ant-design/icons';
import { Button, message, Progress, Select, Table } from 'antd';
import { boxList } from '../../config';
import style from './style.less';
import styles from '../../../style.less';
import classnames from 'classnames';
import { useComparePage } from '../../../step-model-compare/model';
import { useEffect, useRef, useState } from 'react';
import ProTable from '@ant-design/pro-table';
import { changeData } from '@/utils';
import ScoreCardTable from '@/pages/model-step/components/scoreCardTable';
import { getVariableBoxTypeList, getVariableListForBinning } from '../../model/api';
import { useModel } from 'umi';
import config from '@/config/index';

const SubBox: React.FC<any> = (props: any) => {
  const { Option } = Select;
  const actionRef = useRef<any>();
  const [tableList, setTableList] = useState<any>([]);
  // const [boxList, setBoxList] = useState<any>([]);
  const [selectValue, setSelectValue] = useState<any>();

  const { modelId } = useModel('step', (model: any) => ({
    modelId: model.modelId,
  }));

  const getTableList = async () => {
    if (!selectValue) {
      message.warning('请选择分箱方式');
      return;
    }
    let reqData = {
      itmModelRegisCode: modelId,
      binningType: selectValue,
    };
    await getVariableListForBinning(reqData).then((res) => {
      console.log(res?.result?.variableMetricsList);
      let data = res?.result?.variableMetricsList || [];
      data = changeData(data, 'variable');
      console.log(data);
      setTableList(data);
    });
  };

  // const getVariableBoxList = async () => {
  //   await getVariableBoxTypeList({}).then((res) => {
  //     if (res?.status?.code === config.successCode) {
  //       setBoxList(res?.result?.typeList);
  //     } else {
  //       setBoxList([]);
  //     }
  //   });
  // };

  // useEffect(() => {
  //   getVariableBoxList();
  // }, []);

  return (
    <div className={styles.comparePage}>
      <div style={{ marginBottom: '16px' }}>
        分箱方式：
        <Select
          placeholder={'请选择分箱方式'}
          allowClear
          style={{ marginRight: '16px', width: 200 }}
          onChange={setSelectValue}
          value={selectValue}
        >
          {boxList?.map((item: any) => (
            <Option key={item.label} value={item.label}>
              {item.label}
            </Option>
          ))}
        </Select>
        <Button type="primary" onClick={getTableList}>
          开始分箱
        </Button>
      </div>
      <div className={classnames(styles.relateTable)}>
        {/* <ProTable
          className={style['tableBox']}
          headerTitle={

          }
          rowKey={(record: any) => record.id}
          toolBarRender={() => []}
          options={false}
          bordered
          actionRef={actionRef}
          pagination={{
            pageSize: 10,
          }}
          search={false}
          columns={columnsScoreCard}
          request={async (params = {}) => {
            return scoreCardList(params);
          }}
        /> */}
        <ScoreCardTable
          pageType="varBinning"
          headerTitle={
            <div className={style['title']}>
              <span>分箱结果</span>{' '}
              <Button type="link" icon={<DownloadOutlined />}>
                下载
              </Button>
            </div>
          }
          rowKey={(record: any) => record.id}
          toolBarRender={() => []}
          actionRef={actionRef}
          // request={async (params = {}) => {
          //   return scoreCardList(params);
          // }}
          dataSource={tableList}
        />
      </div>
    </div>
  );
};

export default SubBox;
