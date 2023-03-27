import React, { Fragment, useEffect, useRef, useState } from 'react';
import {
  Form,
  Input,
  message,
  Row,
  Col,
  Radio,
  Button,
  Tag,
  InputNumber,
  Select,
  Space,
  Spin,
} from 'antd';
import styles from '../style.less';
import { useModel, history } from 'umi';
import Condition from '@/components/Condition';
import NextStepButton from '../../components/nextstep-button';
import config from '@/config';
import { useBuildModel } from './model';
import TitleStatus from '../../components/title-status';
import PageStatus from './components/statusPage';
import { useSample } from './../step-select-sample/model';
import { useBaseInfoModel } from './../../../model-step/model';
const successCode = config.successCode;
import { useNextStep } from '@/pages/model-step/config';
import LoadingPage from '../loadingPage';

const gutter = { xs: 8, sm: 16, md: 24, lg: 32 };

const STATUS = {
  processing: '进行中',
  success: '已完成',
  error: '处理失败',
};
// 首页
const StepModelBuild: React.FC<any> = (props: any) => {
  // const { initialState, setInitialState } = useModel('@@initialState');

  const [form] = Form.useForm();

  const { beginBuildModel, rebuildModel, nextFlowRequest, loading, setLoading } = useBuildModel();
  const { getCurrentStageRequest } = useSample();
  const { getModelStepDetail } = useBaseInfoModel();
  const { nextStep } = useNextStep();

  const [ruleList, setRulist] = useState<any>([]);
  const [pageType, setPageType] = useState<string>(''); //loading error finish
  const [stepType, setStepType] = useState<any>(0); //  1、2  //  1-> 选择条件    2--> 导入进度

  const isStepwise: any = Form.useWatch('isStepwise', form);
  const isVif: any = Form.useWatch('isVif', form);
  const scoreBinningType: any = Form.useWatch('scoreBinningType', form);
  const varBinningType: any = Form.useWatch('varBinningType', form);

  const {
    modelId,
    curStep,
    doneStep,
    setDoneStep,
    setIsHadBuild,
    isHadReported,
    isReadonly,
    setDoneStepStatus,
    resetScroll,
    setResetScroll,
  } = useModel('step', (model: any) => ({
    modelId: model.modelId,
    doneStep: model.doneStep,
    setDoneStep: model.setDoneStep,
    curStep: model.curStep,
    setIsHadBuild: model.setIsHadBuild,
    isHadReported: model.isHadReported,
    isReadonly: model.isReadonly,
    setDoneStepStatus: model.setDoneStepStatus,
    resetScroll: model.resetScroll,
    setResetScroll: model.setResetScroll,
  }));

  // 表单是否可以编辑
  const isDisabled = isHadReported || isReadonly;

  useEffect(() => {
    getCurrentStage();
    getStageInfo();
  }, []);

  const getStageInfo = async () => {
    let params = {
      itmModelRegisCode: modelId,
      stage: '8',
    };
    setLoading(true);
    let res = await getModelStepDetail(params);
    if (res?.status?.code == successCode) {
      setLoading(false);
      form.setFieldsValue(res.result);
      let temp: any[] = res.result?.variableList;
      setRulist(temp);
    } else {
      setLoading(false);
      message.error(res.status?.desc || '失败');
    }
  };

  const getCurrentStage = async () => {
    if (curStep + 1 < doneStep) {
      setStepType(2);
    } else if (curStep + 1 == doneStep) {
      let res = await getCurrentStageRequest({ itmModelRegisCode: modelId });
      let data = res.result || {};
      if (data.currentStageStatus == '2' || data.currentStageStatus == '3') {
        setStepType(2);
      } else if (data?.currentStageStatus == '1' && data?.isCommittedPage == '1') {
        setStepType(2);
      } else {
        setStepType(1);
      }
    }
  };

  const handleClose = (variable: any) => {
    if (ruleList?.length == 1) {
      message.info('变量不能为空');
      return;
    }
    let temp = JSON.parse(JSON.stringify(ruleList));
    const tags = temp.filter((item: any) => item?.variable !== variable);
    setRulist(tags);
  };

  const beginBuild = async () => {
    let formVal = await form.validateFields();
    setLoading(true);
    let variables: any = [];
    ruleList?.map((item: any) => {
      variables.push(item?.variable);
    });
    variables = variables?.join(',');
    let params = {
      itmModelRegisCode: modelId,
      ...formVal,
    };
    params.variables = variables;
    let res = await beginBuildModel(params);
    if (res.status?.code === successCode) {
      setLoading(false);
      message.success(res.status?.desc || '成功');
      let resobj = await getCurrentStageRequest({ itmModelRegisCode: modelId });
      let data = resobj.result || {};
      setDoneStep(Number(data?.currentStage));
      // setDoneStepStatus('processing');
      setTimeout(() => setStepType(2), 500);
      setResetScroll(resetScroll + 1);
      setStepType(2);
    } else {
      setLoading(false);
      message.error(res.status?.desc || '失败');
    }
  };

  const rebuild = async () => {
    let params = {
      itmModelRegisCode: modelId,
      stage: '8',
    };
    setLoading(true);
    let res = await getModelStepDetail(params);
    if (res.status?.code === successCode) {
      setLoading(false);
      setStepType(1);
      if (doneStep == 8) {
        setDoneStepStatus('processing');
      }
      // setDoneStep(8)
      form.setFieldsValue(res.result);
      let temp: any[] = res.result?.variableList;
      setRulist(temp);
      setResetScroll(resetScroll + 1);
    } else {
      setLoading(false);
      message.error(res.status?.desc || '失败');
    }
  };

  const nextFlow = async () => {
    let params = {
      itmModelRegisCode: modelId,
    };
    setLoading(true);
    let res = await nextFlowRequest(params);
    if (res.status?.code === successCode) {
      setLoading(false);
      // history.push('/modelStep/modelCompare');
      setIsHadBuild(true);
      nextStep();
    } else {
      setLoading(false);
      message.error(res.status?.desc || '失败');
    }
  };

  return (
    <div className={styles['step-page']}>
      <div className={styles['step-title']}>
        <span>模型构建</span>
        <TitleStatus index={8} />
      </div>
      <Condition r-if={stepType === 0}>
        <LoadingPage />
      </Condition>
      <Condition r-if={stepType === 2}>
        <PageStatus onClickReSelect={rebuild} nextFlow={nextFlow} loading={loading} />
      </Condition>
      <Condition r-if={stepType !== 2}>
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            penalty: 'l2',
            solver: 'liblinear',
            c: 1.0,
            lrMaxIter: 100,
            emptySeparate: '0',
            isStepwise: '1',
            estimator: 'ols',
            direction: 'both',
            criterion: 'aic',
            stepwiseMaxIter: 100,
            isVif: '1',
            vifOperator: '=',
          }}
        >
          <Row gutter={gutter}>
            <Col span={8}>
              <Form.Item
                label="建模方法"
                name="modelBuildMethod"
                rules={[{ required: true, message: '请选择建模方法' }]}
              >
                <Select placeholder="请选择建模方法">
                  <Select.Option key={'scoreCard'} value={'scoreCard'}>
                    评分卡
                  </Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <div style={{ marginTop: '20px' }}>
            <b>变量分箱</b>
          </div>
          <Row gutter={gutter}>
            <Col span={6}>
              <Form.Item
                label="变量分箱方式"
                name="varBinningType"
                rules={[{ required: true, message: '请选择变量分箱方式' }]}
              >
                <Select placeholder="请选择变量分箱方式">
                  <Select.Option key={'等频分箱'} value={'等频分箱'}>
                    等频分箱
                  </Select.Option>
                  <Select.Option key={'等距分箱'} value={'等距分箱'}>
                    等距分箱
                  </Select.Option>
                  <Select.Option key={'卡方分箱'} value={'卡方分箱'}>
                    卡方分箱
                  </Select.Option>
                  <Select.Option key={'决策树分箱'} value={'决策树分箱'}>
                    决策树分箱
                  </Select.Option>
                </Select>
              </Form.Item>
            </Col>
            {(varBinningType == '等频分箱' || varBinningType == '等距分箱') && (
              <Col span={6}>
                <Form.Item
                  label="箱数"
                  name="varBoxNum"
                  rules={[{ required: true, message: '请输入箱数' }]}
                >
                  <InputNumber
                    step="1"
                    min={0}
                    max={20}
                    style={{ width: '100%' }}
                    placeholder="请输入"
                  />
                </Form.Item>
              </Col>
            )}
            {(varBinningType == '卡方分箱' || varBinningType == '决策树分箱') && (
              <Col span={6}>
                <Form.Item
                  label="每箱最小样本占比"
                  name="minSampleRate"
                  rules={[{ required: true, message: '请输入每箱最小样本占比' }]}
                >
                  <InputNumber
                    step="0.01"
                    min={0}
                    max={1}
                    precision={2}
                    style={{ width: '100%' }}
                    placeholder="请输入"
                    stringMode
                  />
                </Form.Item>
              </Col>
            )}
            <Col span={6}>
              <Form.Item
                label="变量空值单独分箱"
                name="emptySeparate"
                rules={[{ required: true, message: '请选择' }]}
              >
                <Select>
                  <Select.Option value={'1'}>是</Select.Option>
                  <Select.Option value={'0'}>否</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="选择变量"
                name="variableNames"
                rules={[{ required: false, message: '请选择' }]}
              >
                <div className={styles.listBox}>
                  {ruleList?.map((item: any, index: any) => {
                    return (
                      <Tag
                        closable
                        key={index}
                        onClose={(e) => {
                          e.preventDefault();
                          handleClose(item?.variable);
                        }}
                      >
                        <span>{item?.variableName}</span>
                      </Tag>
                    );
                  })}
                </div>
              </Form.Item>
            </Col>
          </Row>
          <div style={{ marginTop: '20px' }}> </div>
          <Row gutter={gutter}>
            <Col span={24}>
              <Form.Item name="isStepwise" label="逐步回归">
                <Radio.Group>
                  <Radio value="1">是</Radio>
                  <Radio value="0">否</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Condition r-if={isStepwise === '1'}>
              <Col span={6}>
                <Form.Item
                  name="estimator"
                  label="estimator"
                  rules={[{ required: true, message: '请选择' }]}
                >
                  <Select>
                    <Select.Option key={'ols'} value={'ols'}>
                      ols
                    </Select.Option>
                    <Select.Option key={'lr'} value={'lr'}>
                      lr
                    </Select.Option>
                    <Select.Option key={'lasso'} value={'lasso'}>
                      lasso
                    </Select.Option>
                    <Select.Option key={'ridge'} value={'ridge'}>
                      ridge
                    </Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  name="direction"
                  label="方向"
                  rules={[{ required: true, message: '请选择' }]}
                >
                  <Select>
                    <Select.Option key={'forward'} value={'forward'}>
                      forward
                    </Select.Option>
                    <Select.Option key={'backward'} value={'backward'}>
                      backward
                    </Select.Option>
                    <Select.Option key={'both'} value={'both'}>
                      both
                    </Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  name="criterion"
                  label="评判标准"
                  rules={[{ required: true, message: '请选择' }]}
                >
                  <Select>
                    <Select.Option key={'aic'} value={'aic'}>
                      aic
                    </Select.Option>
                    <Select.Option key={'bic'} value={'bic'}>
                      bic
                    </Select.Option>
                    <Select.Option key={'ks'} value={'ks'}>
                      ks
                    </Select.Option>
                    <Select.Option key={'auc'} value={'auc'}>
                      auc
                    </Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="最大循环次数"
                  name="stepwiseMaxIter"
                  rules={[{ required: true, message: '请输入最大循环次数' }]}
                >
                  <InputNumber step="1" min={0} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
            </Condition>
          </Row>

          <div style={{ marginTop: '20px' }}> </div>
          <Row gutter={gutter}>
            <Col span={24}>
              <Form.Item name="isVif" label="多重共线性检验">
                <Radio.Group>
                  <Radio value="1">是</Radio>
                  <Radio value="0">否</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Condition r-if={isVif === '1'}>
              <Col span={3}>
                <Form.Item name="vifOperator" label="VIF阈值设置">
                  <Select>
                    <Select.Option key={'='} value={'='}>
                      {'='}
                    </Select.Option>
                    <Select.Option key={'≠'} value={'≠'}>
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
                </Form.Item>
              </Col>
              <Col span={3}>
                <span className={styles.balanceVal}>
                  <Form.Item name="vifThreshold" label="衡量值">
                    <InputNumber placeholder="衡量值" step="0.1" min={0} max={10} precision={1} />
                  </Form.Item>
                </span>
              </Col>
            </Condition>
          </Row>
          <div style={{ marginTop: '20px' }}>
            <b>LogisticRegression参数</b>
          </div>
          <Row gutter={gutter}>
            <Col span={6}>
              <Form.Item
                label="惩罚项"
                name="penalty"
                rules={[{ required: true, message: '请选择惩罚项' }]}
              >
                <Select placeholder="请选择建模方法">
                  <Select.Option key={'l1'} value={'l1'}>
                    l1
                  </Select.Option>
                  <Select.Option key={'l2'} value={'l2'}>
                    l2
                  </Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="solver"
                name="solver"
                rules={[{ required: true, message: '请选择solver' }]}
              >
                <Select placeholder="请选择solver">
                  <Select.Option key={'liblinear'} value={'liblinear'}>
                    liblinear
                  </Select.Option>
                  <Select.Option key={'lbfgs'} value={'lbfgs'}>
                    lbfgs
                  </Select.Option>
                  <Select.Option key={'newton-cg'} value={'newton-cg'}>
                    newton-cg
                  </Select.Option>
                  <Select.Option key={'sag'} value={'sag'}>
                    sag
                  </Select.Option>
                  <Select.Option key={'saga'} value={'saga'}>
                    saga
                  </Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="正则化系数"
                name="lrc"
                rules={[{ required: true, message: '请输入正则化系数' }]}
                initialValue={1.0}
              >
                <InputNumber step="0.1" min={0} style={{ width: '100%' }} precision={2} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="迭代次数"
                name="lrMaxIter"
                rules={[{ required: true, message: '请输入迭代次数' }]}
              >
                <InputNumber step="1" min={0} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
          <div style={{ marginTop: '20px' }}>
            <b>标准评分卡</b>
          </div>
          <Row gutter={gutter}>
            <Col span={6}>
              <Form.Item
                label="标准分"
                name="baseScore"
                rules={[{ required: true, message: '请输入标准分' }]}
              >
                <InputNumber
                  step="1"
                  min={0}
                  precision={0}
                  style={{ width: '100%' }}
                  placeholder="请输入"
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Pdo" name="pdo" rules={[{ required: true, message: '请输入Pdo' }]}>
                <InputNumber
                  step="1"
                  precision={0}
                  min={0}
                  // max={1}
                  style={{ width: '100%' }}
                  placeholder="请输入"
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Base Odds"
                name="baseOdds"
                rules={[{ required: true, message: '请输入Base Odds' }]}
              >
                <InputNumber
                  step="1"
                  precision={0}
                  min={0}
                  // max={1}
                  style={{ width: '100%' }}
                  placeholder="请输入"
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Rate"
                name="rate"
                rules={[{ required: true, message: '请输入Rate' }]}
              >
                <InputNumber
                  step="0.01"
                  precision={2}
                  min={0}
                  // max={1}
                  style={{ width: '100%' }}
                  placeholder="请输入"
                />
              </Form.Item>
            </Col>

            <Col span={scoreBinningType !== '等频分箱' ? 6 : 3}>
              <Form.Item
                label="评分分箱方式"
                name="scoreBinningType"
                rules={[{ required: true, message: '请输入评分分箱方式' }]}
              >
                <Select
                  getPopupContainer={(trigger) => trigger.parentElement}
                  placeholder={'请选择分箱方式'}
                >
                  <Select.Option key={'等频分箱'} value={'等频分箱'}>
                    等频分箱
                  </Select.Option>
                  <Select.Option key={'等距分箱'} value={'等距分箱'}>
                    等距分箱
                  </Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item
                label="分箱数"
                name="scoreBoxNum"
                rules={[{ required: true, message: '请输入评分分箱方式' }]}
              >
                <InputNumber
                  step="1"
                  precision={0}
                  min={0}
                  max={20}
                  style={{ width: '100%' }}
                  placeholder="分箱数"
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Condition r-if={!isDisabled}>
          <NextStepButton
            onClick={beginBuild}
            text={'开始建模'}
            loading={loading}
            // disabled={isHadReported == '1'}
          />
        </Condition>
      </Condition>
    </div>
  );
};

export default StepModelBuild;
