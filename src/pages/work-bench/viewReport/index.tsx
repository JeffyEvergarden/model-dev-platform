import { PageContainer } from '@ant-design/pro-components';
import { history } from 'umi';
import { Tabs } from 'antd';
import styles from './index.less';
import ModelBasic from './components/modelBasic';

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
            前期分析
          </Tabs.TabPane>
          <Tabs.TabPane tab={'样本定义'} key={'3'}>
            样本定义
          </Tabs.TabPane>
          <Tabs.TabPane tab={'入模变量'} key={'4'}>
            入模变量
          </Tabs.TabPane>
          <Tabs.TabPane tab={'评分卡'} key={'5'}>
            评分卡
          </Tabs.TabPane>
          <Tabs.TabPane tab={'模型效果'} key={'6'}>
            模型效果
          </Tabs.TabPane>
        </Tabs>
      </PageContainer>
    </div>
  );
};
