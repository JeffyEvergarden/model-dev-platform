import { PageContainer } from '@ant-design/pro-components';
import { history } from 'umi';
import { Tabs } from 'antd';
import styles from './index.less';
import ModelBasic from './components/modelBasic';
import PreAnalysis from './components/preAnalysis';
import DefineSample from './components/defineSample';
import InputVariable from '@/pages/model-step/pages/step-export-report/components/InputVariable';
import ScoreCardPage from './components/scoreCardPage';
import CompareAndReportCommonPage from '@/pages/model-step/components/compareAndReportCommonPage';
export default () => {
  const onClickBreadcrumb = (route: any) => {
    history.push(route.path);
  };

  return (
    <div className={styles.model_report_detail}>
      <PageContainer
        header={{
          title: '模型名称',
          ghost: true,
          breadcrumb: {
            itemRender: (route: any, params: any, router: any, paths: any[]) => {
              return (
                <span
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    onClickBreadcrumb(route);
                  }}
                >
                  {route.breadcrumbName}
                </span>
              );
            },
            routes: [
              {
                path: '/workBench/moy-job',
                breadcrumbName: '我的工作台',
              },
              {
                path: '/workBench/viewReport',
                breadcrumbName: '模型报告详情',
              },
            ],
          },
        }}
      >
        <Tabs size="large">
          <Tabs.TabPane tab={'模型概况'} key={'1'}>
            <ModelBasic />
          </Tabs.TabPane>
          <Tabs.TabPane tab={'前期分析'} key={'2'}>
            <PreAnalysis />
          </Tabs.TabPane>
          <Tabs.TabPane tab={'样本定义'} key={'3'}>
            <DefineSample />
          </Tabs.TabPane>
          <Tabs.TabPane tab={'入模变量'} key={'4'}>
            <InputVariable />
          </Tabs.TabPane>
          <Tabs.TabPane tab={'评分卡'} key={'5'}>
            <ScoreCardPage />
          </Tabs.TabPane>
          <Tabs.TabPane tab={'模型效果'} key={'6'}>
            <CompareAndReportCommonPage pageType={'modelEffect'} />
          </Tabs.TabPane>
        </Tabs>
      </PageContainer>
    </div>
  );
};
