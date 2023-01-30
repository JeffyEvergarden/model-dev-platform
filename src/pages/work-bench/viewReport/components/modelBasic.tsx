import { Descriptions } from 'antd';

export default () => {
  return (
    <Descriptions bordered column={2}>
      <Descriptions.Item label="模型名称">线下申请评分V5</Descriptions.Item>
      <Descriptions.Item label="模型开发时间">2022-06-01~2022-07-01</Descriptions.Item>
      <Descriptions.Item label="模型开发人">张力</Descriptions.Item>
      <Descriptions.Item label="政策对接人">李蟠逸</Descriptions.Item>
      <Descriptions.Item label="模型开发目标" span={2}>
        上一版线下申请评分（线下V4）在2020年年底开发，当前已过去1年半时间，模型整体效果逐渐削弱。为使模型更加适配当前场景，有效识别线下进件的客群风险，拟开发新版线下申请评分模型。
      </Descriptions.Item>
      <Descriptions.Item label="现有评分应用现状" span={2}>
        目前正在使用评分线下V3、V4开发时间较早，且KS已衰退至20%及以下，模型中部分变量发生较大程度的偏移。
      </Descriptions.Item>
      <Descriptions.Item label="模型应用场景和思路" span={2}>
        用于线下普通邮你贷授信场景区分客户风险。
      </Descriptions.Item>
      <Descriptions.Item label="模型主要性能指标" span={2}>
        跨期验证KS为29.45%，较线下V4提升7%左右。
      </Descriptions.Item>
      <Descriptions.Item label="模型主要创新点" span={2}>
        将人行公积金缴存状态和线下收入专案获取的公积金月缴结合，更好地反映出客户在历史和现阶段的公积金缴纳情况。并对模型最终效果有一定提升
      </Descriptions.Item>
    </Descriptions>
  );
};
