import React, { useEffect, useRef, useState } from 'react';
import { Form, Button, Tooltip, message } from 'antd';
import style from './style.less';
import SelectFaqModal from './component/select-faq-modal';
import { DeleteOutlined, MinusCircleOutlined, MonitorOutlined } from '@ant-design/icons';
import NextStepButton from '../../components/nextstep-button';
import { useVarSelectModal } from './model';
import { useModel } from 'umi';
import Condition from '@/components/Condition';

// 首页
const SelectModal: React.FC<any> = (props: any) => {
  const { onNext, selectList: backList } = props;
  const selectFaqModalRef = useRef<any>({});
  const [selectList, setSelectList] = useState<any>([]);
  const tmpRef = useRef<any>({});
  const [form] = Form.useForm();

  const { submitLoading, submitFeature, getModelStageInfo } = useVarSelectModal();

  const { modelId, isHadBuild, isHadReported, operate } = useModel('step', (model: any) => ({
    modelId: model.modelId,
    isHadBuild: model.isHadBuild,
    isHadReported: model.isHadReported,
    operate: model.operate,
  }));

  // 打开选择FAQ/意图模态框
  const openSelectFaqModal = (row: any) => {
    tmpRef.current.row = selectList || [];
    let questionTypeList: any[] = selectList || [];

    questionTypeList = Array.isArray(questionTypeList) ? [...questionTypeList] : [];

    (selectFaqModalRef.current as any)?.open({
      selectList: questionTypeList || [],
    });
  };

  const confirmUpdateSelect = (list: any, val: any) => {
    console.log(list, val);
    setSelectList(list);
    (selectFaqModalRef.current as any)?.close();
  };

  const onClick = async () => {
    if (selectList.length === 0) {
      message.warning('请选择变量或者模型');
    } else {
      console.log(selectList);
      let reqData = {
        itmModelRegisCode: modelId,
        featureCodeList: selectList?.map((item: any) => item?.featureCode),
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

  useEffect(() => {
    (async () => {
      await getModelStageInfo({ itmModelRegisCode: modelId }).then((res) => {
        setSelectList(res || []);
        if (!res?.length) {
          setSelectList(backList);
        }
      });
    })();
  }, []);

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
          <div style={{ fontWeight: 700 }}>已选择的变量：</div>

          <div className={style['select-content']}>
            {selectList?.map((item: any, index: number) => {
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
        <Condition r-if={operate == 'EDIT' && !isHadBuild && !isHadReported}>
          <NextStepButton onClick={onClick} text={'提交'} loading={submitLoading} />
        </Condition>
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
