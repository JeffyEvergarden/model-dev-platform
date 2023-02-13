import React, { useEffect, useRef, useState } from 'react';
import { Form, Button, Tooltip, message } from 'antd';
import style from './style.less';
import SelectFaqModal from './component/select-faq-modal';
import { DeleteOutlined, MinusCircleOutlined, MonitorOutlined } from '@ant-design/icons';
import NextStepButton from '../../components/nextstep-button';
import { useVarSelectModal } from './model';

// 首页
const SelectModal: React.FC<any> = (props: any) => {
  const { onNext } = props;
  const selectFaqModalRef = useRef<any>({});
  const [selectList, setSelectList] = useState<any>([]);
  const tmpRef = useRef<any>({});
  const [form] = Form.useForm();

  const { submitFeature } = useVarSelectModal();

  // 打开选择FAQ/意图模态框
  const openSelectFaqModal = (row: any) => {
    // console.log(row);
    // selectlist  (recommendType、recommendId、recommend)
    // disabledWishKeys    禁止选择的意图
    // disabledQuestionKeys  禁止选择的问题
    // selectedQuestionKeys  已选择的问题
    // selectedWishKeys 已选择的意图
    tmpRef.current.row = selectList;
    let questionTypeList: any[] = selectList || [];
    questionTypeList = Array.isArray(questionTypeList) ? [...questionTypeList] : [];
    let selectedQuestionKeys: any[] = questionTypeList
      .filter((item: any) => {
        return item.recommendType == '1';
      })
      .map((item: any) => {
        return item.recommendId;
      });
    let selectedWishKeys: any[] = questionTypeList
      .filter((item: any) => {
        return item.recommendType == '2';
      })
      .map((item: any) => {
        return item.recommendId;
      });
    (selectFaqModalRef.current as any)?.open({
      questionList: selectList || [],
      selectList: questionTypeList, //被选中列表
      selectedQuestionKeys, // 已选问题
      selectedWishKeys, // 已选意图
    });
  };

  const confirmUpdateSelect = (list: any, val: any) => {
    console.log(list, val);
    setSelectList(list);
    (selectFaqModalRef.current as any)?.close();
  };

  const onClick = async () => {
    if (selectList.length === 0) {
      message.warning('请选择需要回溯的编排');
    } else {
      console.log(selectList);
      let reqData = {
        itmModelRegisCode: '',
        featureCodeList: selectList?.map((item: any) => item.featureCode),
      };
      let res = await submitFeature(reqData);
      if (res) {
        onNext?.(selectList);
      }
    }
  };

  const deleteItem = (item: any, index: any) => {
    console.log(item, index);
    let arr = selectList?.filter((val: any) => val?.featureCode != item?.featureCode);
    setSelectList([...arr]);
  };

  return (
    <div>
      <div className={style['']}>
        <Button
          type="primary"
          onClick={() => {
            openSelectFaqModal({});
          }}
        >
          选择变量
        </Button>
        <div className={style['select-box']}>
          <div className={style['title']}>已选择的变量</div>

          <div className={style['select-content']}>
            {selectList.map((item: any, index: number) => {
              return (
                <div className={style['select-item']} key={index}>
                  <Button
                    type="link"
                    onClick={() => {
                      deleteItem(item, index);
                    }}
                  >
                    <MinusCircleOutlined className={style['del']} />
                  </Button>
                  <Tooltip placement="topLeft" title={item?.featureName}>
                    <div className={style['label']}>
                      <span className={style['num']}>{index + 1}.</span>

                      {item?.featureName}
                    </div>
                  </Tooltip>
                </div>
              );
            })}
          </div>
        </div>

        <NextStepButton onClick={onClick} text={'提交'} />
      </div>
      <SelectFaqModal
        cref={selectFaqModalRef}
        confirm={confirmUpdateSelect}
        max={999}
        deleteQuestion={false}
      />
    </div>
  );
};

export default SelectModal;
