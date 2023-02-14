import { Descriptions } from 'antd';

export default (props: any) => {
  const { modelDetail } = props;
  return (
    <Descriptions bordered column={2}>
      <Descriptions.Item label="模型名称">{modelDetail?.modelName}</Descriptions.Item>
      <Descriptions.Item label="模型开发时间">
        {modelDetail?.modelDevStartTime}-{modelDetail?.modelDevEndTime}
      </Descriptions.Item>
      <Descriptions.Item label="模型开发人">{modelDetail?.modelAnalyst}</Descriptions.Item>
      <Descriptions.Item label="政策对接人">
        {modelDetail?.modelPolicyCounterpart}
      </Descriptions.Item>
      <Descriptions.Item label="模型开发目标" span={2}>
        {modelDetail?.modelDevTarget}
      </Descriptions.Item>
      <Descriptions.Item label="现有评分应用现状" span={2}>
        {modelDetail?.modelPresentSituation}
      </Descriptions.Item>
      <Descriptions.Item label="模型应用场景和思路" span={2}>
        {modelDetail?.modelSceneThought}
      </Descriptions.Item>
      <Descriptions.Item label="模型主要性能指标" span={2}>
        {modelDetail?.modelPerformanceMetrics}
      </Descriptions.Item>
      <Descriptions.Item label="模型主要创新点" span={2}>
        {modelDetail?.modelInnovation}
      </Descriptions.Item>
    </Descriptions>
  );
};
