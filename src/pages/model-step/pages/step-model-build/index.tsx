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
import CommonPage from '@/pages/model-step/components/common-page';
import config from '@/config';
import { useBuildModel } from './model';
import TitleStatus from '../../components/title-status';
import { stubFalse } from 'lodash';

const successCode = config.successCode;

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

  const [ruleList, setRulist] = useState<any>([
    { name: '变量一', value: '1' },
    { name: '变量二', value: '2' },
    { name: '变量三', value: '3' },
  ]);
  const [pageType, setPageType] = useState<string>(''); //loading error finish
  const [formVal, setFormVal] = useState<any>({});
  const [tagStatus, setTagStatus] = useState<string>('processing'); //processing success error

  const isStepwise: any = Form.useWatch('isStepwise', form);
  const isVif: any = Form.useWatch('isVif', form);
  const scoreBinningType: any = Form.useWatch('scoreBinningType', form);

  const handleClose = (entityValueName: any) => {
    let temp = JSON.parse(JSON.stringify(ruleList));
    const tags = temp.filter((item: any) => item.value !== entityValueName.value);
    setRulist(tags);
  };

  const beginBuild = async () => {
    let formVal = await form.validateFields();
    setLoading(true);
    let params = {
      itmModelRegisCode: '',
      sampleTable: '',
      ...formVal,
    };
    let res = await beginBuildModel(params);
    if (res.status?.code === successCode) {
      setLoading(false);
      message.success(res.status?.desc || '成功');
      setFormVal(formVal);
      setPageType('finish');
      setTagStatus('success');
    } else {
      setLoading(false);
      message.error(res.status?.desc || '失败');
      setPageType('');
      setTagStatus('');
    }
  };

  const rebuild = async () => {
    let params = {
      itmModelRegisCode: '',
    };
    setLoading(true);
    let res = await rebuildModel(params);
    if (res.status?.code === successCode) {
      setLoading(false);
      setPageType('');
      // setRulist(ruleList)
      setTagStatus('processing');
      setFormVal(formVal);
      form.setFieldsValue(formVal);
    } else {
      setLoading(false);
      message.error(res.status?.desc || '失败');
      setPageType('');
      setTagStatus('');
      form.setFieldsValue(formVal);
    }
  };

  const nextFlow = async () => {
    let params = {
      itmModelRegisCode: '',
    };
    setLoading(true);
    let res = await nextFlowRequest(params);
    if (res.status?.code === successCode) {
      setLoading(false);
      history.push('/modelStep/modelCompare');
    } else {
      setLoading(false);
      message.error(res.status?.desc || '失败');
    }
  };

  return (
    <div className={styles['step-page']}>
      <div className={styles['step-title']}>
        <span>模型构建</span>
        <TitleStatus index={8}></TitleStatus>
      </div>
      <Condition r-if={pageType !== ''}>
        <CommonPage
          loadingContent={
            <>
              <div className={styles['title']}>建模中</div>
              <div className={styles['desc']}>请稍候，待建模完成后可开始下一个流程</div>
            </>
          }
          sucessContent={
            <>
              <div className={styles['title']}>建模完成</div>
              <div className={styles['desc']} />
            </>
          }
          errorContent={
            <>
              <div className={styles['title']}>建模失败</div>
              <div className={styles['desc']}>失败原因：描述描述描述描述描述描述描述描述描述</div>
            </>
          }
          pageType={pageType}
        />
      </Condition>
      <Condition r-if={pageType == ''}>
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            penalty: 12,
            solver: 'solver1',
            c: 1.0,
            lrMaxIter: 100,
            emptySeparate: '否',
            isStepwise: '是',
            estimator: 'ols',
            direction: 'both',
            criterion: 'aic',
            stepwiseMaxIter: 100,
            isVif: '是',
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
                  <Select.Option key={'评分卡'} value={'评分卡'}>
                    评分卡
                  </Select.Option>
                </Select>
              </Form.Item>
            </Col>
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
                  <Select.Option key={11} value={11}>
                    11
                  </Select.Option>
                  <Select.Option key={12} value={12}>
                    12
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
                  <Select.Option key={'solver1'} value={'solver1'}>
                    solver1
                  </Select.Option>
                  <Select.Option key={'solver2'} value={'solver2'}>
                    solver2
                  </Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="正则化系数"
                name="c"
                rules={[{ required: true, message: '请输入正则化系数' }]}
              >
                <InputNumber step="0.1" min={0} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="迭代次数"
                name="lrMaxIter"
                rules={[{ required: true, message: '请输入迭代次数' }]}
              >
                <InputNumber step="0.1" min={0} style={{ width: '100%' }} />
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
                  <Select.Option key={'卡方分箱'} value={'卡方分箱'}>
                    卡方分箱
                  </Select.Option>
                  <Select.Option key={'决策树分箱'} value={'决策树分箱'}>
                    决策树分箱
                  </Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="箱数"
                name="boxNum"
                rules={[{ required: true, message: '请输入箱数' }]}
              >
                <InputNumber step="1" min={0} style={{ width: '100%' }} placeholder="请输入" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="每箱最小样本占比"
                name="minSampleRate"
                rules={[{ required: true, message: '请输入迭代次数' }]}
              >
                <InputNumber
                  step="0.1"
                  min={0}
                  max={1}
                  style={{ width: '100%' }}
                  placeholder="请输入"
                  stringMode
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="变量空值单独分箱"
                name="emptySeparate"
                rules={[{ required: true, message: '请选择' }]}
              >
                <Select>
                  <Select.Option value={'是'}>是</Select.Option>
                  <Select.Option value={'否'}>否</Select.Option>
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
                          handleClose(item);
                        }}
                      >
                        <span>{item.name}</span>
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
                  <Radio value="是">是</Radio>
                  <Radio value="否">否</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Condition r-if={isStepwise === '是'}>
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
                  <Radio value="是">是</Radio>
                  <Radio value="否">否</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Condition r-if={isVif === '是'}>
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
                    <Input placeholder="衡量值" />
                  </Form.Item>
                </span>
              </Col>
            </Condition>
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
                <InputNumber step="1" min={0} style={{ width: '100%' }} placeholder="请输入" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Pdo" name="Pdo" rules={[{ required: true, message: '请输入Pdo' }]}>
                <InputNumber
                  step="0.1"
                  min={0}
                  max={1}
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
                  step="0.1"
                  min={0}
                  max={1}
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
                  step="0.1"
                  min={0}
                  max={1}
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
            <Condition r-if={scoreBinningType === '等频分箱'}>
              <Col span={3}>
                <Form.Item
                  label="分箱数"
                  name="scoreBoxNum"
                  rules={[{ required: true, message: '请输入评分分箱方式' }]}
                >
                  <InputNumber
                    step="1"
                    min={0}
                    max={20}
                    style={{ width: '100%' }}
                    placeholder="分箱数"
                  />
                </Form.Item>
              </Col>
            </Condition>
          </Row>
        </Form>
      </Condition>
      <Condition r-if={pageType == ''}>
        <NextStepButton onClick={beginBuild} text={'开始建模'} loading={loading} />
      </Condition>
      <Condition r-if={pageType == 'error'}>
        <NextStepButton onClick={rebuild} text={'重新建模'} />
      </Condition>
      <Condition r-if={pageType == 'finish'}>
        <NextStepButton
          btnNode={
            <Space>
              <Button onClick={rebuild} size="large">
                重新建模
              </Button>
              <Button onClick={nextFlow} size="large" type="primary">
                下一流程
              </Button>
            </Space>
          }
        />
      </Condition>
    </div>
  );
};

export default StepModelBuild;
