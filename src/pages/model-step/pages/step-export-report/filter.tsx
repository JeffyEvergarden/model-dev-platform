import React, { useState, useEffect, useRef } from 'react';
import { Form, Input, DatePicker, Row, Col, Radio, Button, Table, Select } from 'antd';
import style from './style.less';

const Option = Select.Option;

export const filterDropdown = (columnName: any, list: any[]) => {
  return ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => {
    const [selectVal, setSelectVal] = useState<any>(undefined);

    const [inputVal, setInputVal] = useState<any>(undefined);
    // -----------------
    const onChange1 = (e: any) => {
      setSelectVal(e);
    };

    const onChange2 = (e: any) => {
      setInputVal(e.target.value);
    };

    const onConfirm = () => {
      setSelectedKeys([[columnName, selectVal, inputVal]]);
      confirm();
    };

    return (
      <div>
        <div className={style['zy-dropdown']}>
          <span>测试:</span>
          <Select
            value={selectVal}
            placeholder={'请选择'}
            onChange={onChange1}
            style={{ width: '120px', marginLeft: '12px' }}
          >
            {list.map((item: any, index: number) => {
              return (
                <Option key={index} value={item.value}>
                  {item.label}
                </Option>
              );
            })}
          </Select>

          <Input
            value={inputVal}
            onChange={onChange2}
            placeholder={'请输入衡量值'}
            style={{ width: '120px', marginLeft: '12px' }}
          />
        </div>

        <div className={style['zy-end']}>
          <Button type="primary" onClick={onConfirm}>
            确定
          </Button>
        </div>
      </div>
    );
  };
};

export const filterData = (keys: any, data: any) => {
  if (!Array.isArray(keys)) {
    return true;
  }
  let [key, op, val]: any = keys;

  // 是数字
  if (isNaN(val)) {
    return true;
  }
  let cur: any = data[key];
  val = Number(val);
  if (op === '=') {
    return cur === val;
  } else if (op === '>') {
    return cur > val;
  } else if (op === '>=') {
    return cur >= val;
  } else if (op === '<') {
    return cur < val;
  } else if (op === '<=') {
    return cur <= val;
  } else if (op != '!=') {
    return cur !== val;
  }
  return false;
};
