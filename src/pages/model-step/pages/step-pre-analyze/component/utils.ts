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
      <div class="${style.value}">${changeTwoDecimal_f(value)}${
      Number(value) ? '%' : Number(value) == 0 ? '%' : ''
    }</div>
    </div>`;

    // if (predict) {
    //   arrStr += `
    //     <div class='${style['tooltips-item']}'>
    //     <div class="${style.icon}" style="background: ${
    //     item?.color?.colorStops?.[0]?.color ? item?.color?.colorStops?.[0]?.color : item?.color
    //   };opacity: ${0.3}"></div>
    //       <div class="${style.label}">预测${label}</div>
    //       <div class="${style.value}">${predict}${Number(predict) ? '%' : ''}</div>
    //     </div>`;
    // }
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

//格式化两位小数
export function changeTwoDecimal_f(x: any) {
  let f_x = parseFloat(x);
  if (isNaN(f_x)) {
    return x;
  }
  f_x = Math.round(x * 100) / 100;
  let s_x = f_x.toString();
  let pos_decimal = s_x.indexOf('.');
  if (pos_decimal < 0) {
    pos_decimal = s_x.length;
    s_x += '.';
  }
  while (s_x.length <= pos_decimal + 2) {
    s_x += '0';
  }
  return s_x;
}
