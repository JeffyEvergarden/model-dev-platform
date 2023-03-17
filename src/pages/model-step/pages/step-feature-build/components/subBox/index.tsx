import { DownloadOutlined } from '@ant-design/icons';
import { Button, InputNumber, message, Progress, Select, Table } from 'antd';
import { boxList } from '../../config';
import style from './style.less';
import styles from '../../../style.less';
import classnames from 'classnames';
import { useComparePage } from '../../../step-model-compare/model';
import { useEffect, useImperativeHandle, useRef, useState } from 'react';
import ProTable from '@ant-design/pro-table';
import { changeData } from '@/utils';
import ScoreCardTable from '@/pages/model-step/components/scoreCardTable';
import { boxExport, getVariableBoxTypeList, getVariableListForBinning } from '../../model/api';
import { useModel } from 'umi';
import config from '@/config/index';
import Condition from '@/components/Condition';

const SubBox: React.FC<any> = (props: any) => {
  const { cref, varRef } = props;
  const { Option } = Select;
  const actionRef = useRef<any>();
  const tableRef = useRef<any>();
  const [tableList, setTableList] = useState<any>([]);
  const [originTableList, setOriginTableList] = useState<any>([]);
  const [loading, setLoading] = useState<any>(false);
  // const [boxList, setBoxList] = useState<any>([]);
  const [selectValue, setSelectValue] = useState<any>();
  const [binningNum, setBinningNum] = useState<any>();

  const { modelId } = useModel('step', (model: any) => ({
    modelId: model.modelId,
  }));

  const varType: any = {
    number: '数值',
    string: '字符',
    boolean: '布尔',
    datetime: '日期',
    list: '列表',
  };

  const getTableList = async () => {
    console.log(varRef?.current?.selectList);
    if (!varRef?.current?.selectList?.length) {
      message.warning('请选择变量');
      return;
    }

    if (!selectValue) {
      message.warning('请选择分箱方式');
      return;
    }

    if (selectValue == '等频分箱' || selectValue == '等距分箱') {
      if (!binningNum) {
        message.warning('请输入分箱个数');
        return;
      }
    }
    let reqData = {
      itmModelRegisCode: modelId,
      binningType: selectValue,
      binningNumber: binningNum,
      selectedVariables: varRef?.current?.selectList?.join(),
    };
    let data: any = [];
    let total: any = 0;
    setLoading(true);
    await getVariableListForBinning(reqData).then((res) => {
      setLoading(false);
      console.log(res?.result);
      data = res?.result || [];
      total = data?.length;
      console.log(data);
      setOriginTableList(data);
      data = togetherData(data);
      console.log(data);
      setTableList(data);
      return { data, total: total };
    });
    return { data, total: total };
  };

  useImperativeHandle(cref, () => ({
    originTableList: originTableList,
  }));

  const togetherData = (data: any) => {
    let tempArr: any = [];
    data?.map((item: any, index: any) => {
      item?.binning?.map((el: any) => {
        tempArr.push({
          idx: index,
          id: el?.variable,
          variable: item?.variable,
          variableName: item?.variableName,
          variableType: varType[item?.variableType],
          boxGroup: el?.boxGroup,

          trainBadRate: el?.trainBadRate,
          trainBoxRate: el?.trainBoxRate,
          trainIv: el?.trainIv,
          trainKs: el?.trainKs,
          trainPsi: el?.trainPsi,

          validBadRate: el?.validBadRate,
          validBoxRate: el?.validBoxRate,
          validIv: el?.validIv,
          validKs: el?.validKs,
          validPsi: el?.validPsi,
        });
      });
    });
    console.log(tempArr);

    return changeData(tempArr, 'variable');
  };

  const exportTable = async () => {
    console.log(1);

    if (!tableRef?.current?.selectList?.length) {
      message.warning('请选择列表');
      return;
    }
    let reqData = {
      itmModelRegisCode: modelId,
      variableList: originTableList?.filter((item: any) =>
        tableRef?.current?.selectList?.includes(item.variable),
      ),
    };
    await boxExport(reqData)
      .then((res: any) => {
        const blob: any = res;
        const reader = new FileReader(blob);
        reader.readAsDataURL(blob);
        reader.onload = (e: any) => {
          const a = document.createElement('a');
          a.download = `特征工程分箱结果.${'xls'}`;
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
        <Condition r-if={selectValue == '等频分箱' || selectValue == '等距分箱'}>
          <InputNumber
            style={{ marginRight: '16px' }}
            onChange={setBinningNum}
            max={20}
            placeholder="分箱个数"
            controls={false}
            value={binningNum}
          ></InputNumber>
        </Condition>
        <Button
          type="primary"
          onClick={() => {
            // actionRef?.current?.reload()
            getTableList();
          }}
        >
          开始分箱
        </Button>
      </div>
      <div className={classnames(styles.relateTable)}>
        <ScoreCardTable
          cref={tableRef}
          pageType="varBinning"
          headerTitle={
            <div className={style['title']}>
              <span>分箱结果</span>{' '}
            </div>
          }
          rowKey={(record: any) => record.id}
          toolBarRender={() => [
            <Button type="link" icon={<DownloadOutlined />} onClick={exportTable}>
              下载
            </Button>,
          ]}
          actionRef={actionRef}
          // request={async (params = {}) => {
          //   return scoreCardList(params);
          // }}
          // requestMethod={getTableList}
          // dataSource={tableList}
          originTableList={originTableList}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default SubBox;
