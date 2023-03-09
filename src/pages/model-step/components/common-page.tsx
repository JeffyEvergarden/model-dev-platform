import React, { useEffect, useRef } from 'react';
import { Form, Input, DatePicker, Row, Col, Select } from 'antd';
import { LoadingOutlined, CheckCircleTwoTone, CloseCircleOutlined } from '@ant-design/icons';
import styles from './style.less';
import { useState } from 'react';
import Condition from '@/components/Condition';

const FormItem = Form.Item;

const TextArea = Input.TextArea;

const { RangePicker }: any = DatePicker;

const { Option } = Select;

// 首页
const StepTwo: React.FC<any> = (props: any) => {
  // const { initialState, setInitialState } = useModel('@@initialState');
  const {
    loadingContent,
    sucessContent,
    errorContent,
    pageType = 'loading',
    columns,
    detailInfo,
    dataList,
    page,
  } = props;

  // const [pageType, setPageType] = useState<any>('loading'); // init、 loading、finish、fail

  useEffect(() => {
    console.log(dataList);
  }, [dataList]);

  return (
    <div>
      <Condition r-if={pageType === 'loading'}>
        <div className={styles['page_loading']}>
          <div className={styles['my-column']}>
            <div className={styles['common-icon']}>
              <LoadingOutlined style={{ color: '#1890ff' }} />
            </div>
            <div className={styles['common-content']}>{loadingContent}</div>
          </div>
        </div>
      </Condition>

      <Condition r-if={pageType === 'finish'}>
        <div className={styles['page_finish']}>
          <div className={styles['my-column']}>
            <div className={styles['common-icon']}>
              <CheckCircleTwoTone twoToneColor="#52c41a" />
            </div>
            <div className={styles['common-content']}>{sucessContent || loadingContent}</div>
          </div>
        </div>
      </Condition>

      <Condition r-if={pageType === 'error'}>
        <div className={styles['page_finish']}>
          <div className={styles['my-column']}>
            <div className={styles['common-icon']}>
              <CloseCircleOutlined style={{ color: '#ff4d4f' }} />
            </div>
            <div className={styles['common-content']}>{errorContent || loadingContent}</div>
          </div>
        </div>
      </Condition>

      <Condition r-if={detailInfo && columns && columns?.length}>
        <div className={styles['detail-content']}>
          {columns?.map((item: any, index: number) => {
            let val = detailInfo[item.key];
            let fn = item?.formate;
            if (typeof fn === 'function') {
              val = fn(val);
            }
            if (item.key == 'rangeDate') {
              val = `${detailInfo?.startTime}~${detailInfo?.endTime}`;
            }
            if (item.key == 'featureLabel') {
              val = `${detailInfo?.featureLabel?.featureCode ?? ''}${
                detailInfo?.featureLabel?.operator ?? ''
              }${detailInfo?.featureLabel?.params ?? ''}`;
            }
            if (item.key == 'tableName') {
              val = `${detailInfo?.tableName ?? ''}`;
            }
            if (item.key == 'dimensionField') {
              val = `${detailInfo?.dimensionField ?? ''}`;
            }
            return (
              <div className={page == 3 ? '' : styles['col-row']} key={index}>
                <span className={styles['label-item']}>{item?.name}：</span>
                <span className={styles['value-item']}>{val}</span>
              </div>
            );
          })}
        </div>
      </Condition>

      <Condition r-if={dataList?.length}>
        <div className={styles['detail-content']}>
          <div className={styles['col-row-title']}>已选择的变量：</div>
          {dataList?.map((item: any, index: any) => {
            if (index < 8) {
              return (
                <div className={styles['col-row-3']} key={index}>
                  <span className={styles['label-item']}>{index + 1}.</span>
                  <span className={styles['value-item']}>{item}</span>
                </div>
              );
            }
            if (index == 8) {
              return (
                <div className={styles['col-row-3']} key={index}>
                  <span className={styles['value-item']}>......</span>
                </div>
              );
            }
          })}
        </div>
      </Condition>
    </div>
  );
};

export default StepTwo;
