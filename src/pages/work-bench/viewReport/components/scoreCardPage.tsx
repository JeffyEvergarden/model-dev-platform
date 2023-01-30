import ScoreCardTable from '@/pages/model-step/components/scoreCardTable';
import { changeData } from '@/utils';
import { useDefineSample } from '../model';

export default () => {
  const { getScoreCardList } = useDefineSample();

  const scoreCardList = async (payload: any) => {
    let params = {};

    let res = await getScoreCardList(params);
    let tempArr: any = [];
    res?.data?.list?.map((item: any, index: any) => {
      item?.dividerList?.map((el: any) => {
        tempArr.push({
          idx: index,
          id: item.id + '-' + el.id,
          name: item?.name,
          nameZH: item?.nameZH,
          divider: el?.divider,
          score: el?.score,
          badRate: el?.badRate,
          trateRate: el?.trateRate,
          trateCurrentRate: el?.trateCurrentRate,
          verifyCurrentRate: el?.verifyCurrentRate,
        });
      });
    });
    changeData(tempArr, 'name');
    return {
      data: tempArr || [],
      total: res?.data?.total || 0,
      current: payload.current,
      pageSize: payload.pageSize,
    };
  };

  return (
    <ScoreCardTable
      pageType="compareAndReport"
      headerTitle="评分卡-计算逻辑"
      rowKey={(record: any) => record.id}
      toolBarRender={() => []}
      // actionRef={actionRef}
      request={async (params = {}) => {
        return scoreCardList(params);
      }}
    />
  );
};
