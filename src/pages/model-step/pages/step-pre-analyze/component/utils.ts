import style from './style.less';
export const formateTooltip = (params: any) => {
  const arr = params || [];
  // console.log(arr);
  const titleStr = arr?.[0]?.name || '';
  let arrStr = '';
  arr?.forEach((item: any, index: number) => {
    let label = item?.seriesName;
    let value = item?.value;
    let predict = item?.data?.predict;

    arrStr += `
    <div class='${style['tooltips-item']}'>
      <div class="${style.icon}" style="background: ${
      item?.color?.colorStops?.[0]?.color ? item?.color?.colorStops?.[0]?.color : item?.color
    }"></div>
      <div class="${style.label}">${label}</div>
      <div class="${style.value}">${value}${value ? '%' : '-'}</div>
    </div>`;

    if (predict) {
      arrStr += `
        <div class='${style['tooltips-item']}'>
        <div class="${style.icon}" style="background: ${
        item?.color?.colorStops?.[0]?.color ? item?.color?.colorStops?.[0]?.color : item?.color
      };opacity: ${0.3}"></div>
          <div class="${style.label}">预测${label}</div>
          <div class="${style.value}">${predict}${predict ? '%' : '-'}</div>
        </div>`;
    }
  });
  return `
    <div class='${style['tooltips-box']}'>
      <div class='${style['tooltips-item']}'>
        ${titleStr}
      </div>
      ${arrStr}
    </div>
  `;
};
