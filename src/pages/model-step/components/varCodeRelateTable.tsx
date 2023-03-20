import React, { Fragment, useEffect, useState } from 'react';
import { ProTable } from '@ant-design/pro-components';
import styles from './style.less';
import classnames from 'classnames';
import { Tooltip } from 'antd';

//使用前提：dataSource和columns数据字段和格式需要保持一致

export default (props: any) => {
  const { headerTitle, rowKey, toolBarRender, actionRef, data, request } = props;

  // const [dataSourceRelate, setDataSourceRelate] = useState<any>([]);
  const [columnsRelate, setColumnsRelate] = useState<any>([]);

  useEffect(() => {
    let temp: any = [
      {
        title: '',
        dataIndex: 'name',
        key: 'name',
        ellipsis: true,
        fixed: 'left',
        render: (t: any, r: any, i: any) => {
          return (
            <Tooltip title={r.name}>
              <span className={styles.cellSty}>{r.name}</span>
            </Tooltip>
          );
        },
      },
    ];
    data?.rowList.map((item: any, index: any) => {
      temp.push({
        title: () => {
          return (
            <Tooltip title={item} placement="topLeft">
              {item}
            </Tooltip>
          );
        },
        dataIndex: item,
        key: item,
        ellipsis: true,
        render: (t: any, r: any, i: any) => {
          let currentVal = Math.abs(Number(r?.[item]));
          return (
            <Fragment>
              {(currentVal < 0.1 || currentVal == 0.1) && (
                <span className={classnames(styles.commonSty, styles.colorFir)}>{t}</span>
              )}
              {0.1 < currentVal && (currentVal < 0.2 || currentVal == 0.2) && (
                <span className={classnames(styles.commonSty, styles.colorTwo)}>{t}</span>
              )}
              {0.2 < currentVal && (currentVal < 0.3 || currentVal == 0.3) && (
                <span className={classnames(styles.commonSty, styles.colorThree)}>{t}</span>
              )}
              {0.3 < currentVal && (currentVal < 0.4 || currentVal == 0.4) && (
                <span className={classnames(styles.commonSty, styles.colorFour)}>{t}</span>
              )}
              {0.4 < currentVal && (currentVal < 0.5 || currentVal == 0.5) && (
                <span className={classnames(styles.commonSty, styles.colorFive)}>{t}</span>
              )}
              {0.5 < currentVal && currentVal < 1 && (
                <span className={classnames(styles.commonSty, styles.colorSix)}>{t}</span>
              )}
              {currentVal == 1 && (
                <span className={classnames(styles.commonSty, styles.colorSeven)}>{t}</span>
              )}
            </Fragment>
          );
        },
      });
    });
    setColumnsRelate(temp);
  }, [data]);
  return (
    <div className={classnames(styles.relateTable, styles.TableCommonSty)}>
      <ProTable
        headerTitle={headerTitle}
        rowKey={rowKey}
        toolBarRender={toolBarRender}
        options={false}
        bordered
        actionRef={actionRef}
        pagination={false}
        search={false}
        columns={columnsRelate}
        dataSource={data?.correlationList}
        scroll={{
          x: columnsRelate?.length * 150,
          y: data?.correlationList?.length > 10 ? 300 : undefined,
        }}
      />
    </div>
  );
};
