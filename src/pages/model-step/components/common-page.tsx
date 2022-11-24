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
  const { loadingContent, sucessContent, errorContent } = props;

  const [pageType, setPageType] = useState<any>('loading'); // init、 loading、finish、fail

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

      <Condition r-if={pageType === 'loading'}>
        <div className={styles['page_finish']}>
          <div className={styles['my-column']}>
            <div className={styles['common-icon']}>
              <CheckCircleTwoTone twoToneColor="#52c41a" />
            </div>
            <div className={styles['common-content']}>{sucessContent || loadingContent}</div>
          </div>
        </div>
      </Condition>

      <Condition r-if={pageType === 'loading'}>
        <div className={styles['page_finish']}>
          <div className={styles['my-column']}>
            <div className={styles['common-icon']}>
              <CloseCircleOutlined style={{ color: '#ff4d4f' }} />
            </div>
            <div className={styles['common-content']}>{errorContent || loadingContent}</div>
          </div>
        </div>
      </Condition>

      <div className={styles['common-content']}></div>
    </div>
  );
};

export default StepTwo;
