import React, { useEffect, useRef } from 'react';

import * as echarts from 'echarts';
import { Spin } from 'antd';
import style from '../../style.less';
import { formateTooltip } from './utils';

const LineChart: React.FC<any> = (props: any) => {
  let { base = 1, id = 1, data = [], loading = false, tableType, columns = [] } = props;
  const lineChart = useRef<any>(null);

  let first = false;
  // 格式化数字
  base = isNaN(base) ? 1 : base;

  const initOptions = (columns: any[], series: any, x: any) => {
    return Object.assign(
      {},
      {
        textStyle: {
          fontFamily: 'PingFang SC, Microsoft YaHei, SimHei',
        },
        legend: {
          type: 'scroll',
          data: columns,
          orient: 'vertical',
          right: 10 * base,
          top: 20 * base,
          bottom: 20 * base,
        },
        grid: {
          top: 20 * base,
          left: 80 * base,
          right: 140 * base,
          bottom: 50 * base,
        },
        tooltip: {
          trigger: 'axis',
          formatter: formateTooltip,
        },
        xAxis: {
          type: 'category',
          data: x,
          axisTick: {
            show: false,
            alignWithLabel: true,
          },
          // axisLabel: {
          //   color: 'rgba(0, 0, 0, 0.65)',
          //   // showMaxLabel: true,
          // },
        },
        yAxis: [
          {
            type: 'value',
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dashed',
                color: 'rgba(0,0,0,0.07)',
              },
            },
            axisLabel: {
              formatter: (val: any) => {
                return val + '%';
              },
            },
          },
        ],
        series: series,
      },
    );
  };

  const initMap = () => {
    let x: any = [];
    const col: any = columns?.filter((item: any, index: any) => {
      return index > 0;
    });
    data?.forEach((item: any) => {
      x.push(item[0]);
    });
    const series: any = col?.map?.((item: any, index: any) => {
      // x.push(data[index + 1][0])
      return {
        name: item,
        type: 'line',
        data: data?.map?.((itm: any, idx: any) => {
          return parseFloat(itm[index + 1]) || '-';
        }),
      };
    });
    // if (!data1.length || !data2.length) {
    // return;
    // }
    console.log('---------------------', data, col, series, x);

    const options: any = initOptions(col, series, x);
    lineChart.current.setOption(options);
  };

  useEffect(() => {
    const chartDom = document.getElementById(`linebox-${id}`);
    lineChart.current = echarts.init(chartDom as any);
    initMap();
    first = true;
  }, []);

  useEffect(() => {
    console.log(columns, data);
    if (!first) {
      // console.log('重新绘制-------：', lineChart.current);
      initMap();
      lineChart.current?.resize?.();
    }
  }, [base, data, tableType]);

  return (
    <div className={style['line-box']}>
      <Spin spinning={loading}>
        <div id={`linebox-${id}`} className={style['line-box']}></div>
      </Spin>
    </div>
  );
};

export default LineChart;
