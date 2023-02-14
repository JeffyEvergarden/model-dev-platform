import { Button, Divider, Form, Input, message, Select, Slider, Space, Table } from 'antd';
import { useRef } from 'react';
import { twoDecimal_f } from '../utils/util';
import SubBox from './components/subBox';
import VarCardList from './components/varCardList';
import { VarBoxList } from './config';
import style from './style.less';

const MissingValueFilling: React.FC<any> = (props: any) => {
  const [form] = Form.useForm();
  const { Item: FormItem, List: FormList } = Form;
  const varRef: any = useRef();

  const sliderAndInput = (val: any) => {
    if (Array.isArray(val)) {
      let str: any = val?.map((item: any) => twoDecimal_f(item))?.join('~');
      return str;
    }
    if (typeof val == 'string') {
      let arr: any = val.split('~');
      return arr;
    }
  };

  const onChange = (e: any, name: any, str: any) => {
    let val = e.target.value;
    let arr: any = val.split('~');
    let formData: any = form.getFieldsValue();
    if (arr.length == 2 && arr[0] && arr[1]) {
      console.log(arr);
      if (Number(arr[0]) != NaN && Number(arr[1] != NaN)) {
        arr[0] = Number(arr[0]);
        arr[1] = Number(arr[1]);
        console.log(arr[0], arr[1]);

        if (arr[0] > arr[1]) {
          arr = arr.reverse();
        }
        if (arr[1] > (name == 'ivFilter' ? 10 : 1) || arr[0] < 0) {
          message.warning(name == 'ivFilter' ? '请保证范围在0-10' : '请保证范围在0-1');
          console.log(formData);
          formData[str] = formData?.[name]?.map((item: any) => twoDecimal_f(item))?.join('~');
          form.setFieldsValue({ ...formData });
          return;
        }
        formData[name] = arr;
        formData[str] = arr?.map((item: any) => twoDecimal_f(item))?.join('~');
        form.setFieldsValue({ ...formData });
      }
    } else {
      formData[str] = formData?.[name]?.map((item: any) => twoDecimal_f(item))?.join('~');
      form.setFieldsValue({ ...formData });
    }
  };

  const selectVar = (type?: any) => {
    console.log(form.getFieldsValue());
    let formData = form.getFieldsValue();
    let selectList = {
      ivFilter: formData?.ivFilter?.join(),
      ksFilter: formData?.ksFilter?.join(),
      missFilter: formData?.missFilter?.join(),
      corrFilter: formData?.corrFilter?.join(),
    };
    console.log(selectList);

    varRef?.current?.getVarList(selectList, type);
  };

  return (
    <div>
      <div style={{ fontWeight: 'bold', fontSize: '16px' }}>变量分箱</div>
      <Form form={form} labelCol={{ span: 8 }}>
        <div className={style['form']}>
          {VarBoxList?.map((item: any, index: any) => {
            return (
              <div style={{ display: 'flex' }} className={style['slider']} key={index}>
                <FormItem
                  label={item.label}
                  style={{ marginRight: '10px', width: '250px' }}
                  name={item.name}
                  initialValue={[item.min, item.max]}
                >
                  <Slider
                    range
                    style={{ width: '150px' }}
                    onChange={(val: any) => {
                      form.setFieldsValue({ [item.str]: sliderAndInput(val) });
                    }}
                    max={Number(item.max)}
                    min={Number(item.min)}
                    step={0.01}
                  ></Slider>
                </FormItem>
                <FormItem label={false} initialValue={`${item.min}~${item.max}`} name={item.str}>
                  <Input
                    size="small"
                    style={{ width: '100px' }}
                    // onChange={onChange}
                    onBlur={(e: any) => {
                      onChange(e, item?.name, item?.str);
                    }}
                  ></Input>
                </FormItem>
              </div>
            );
          })}
          <div style={{ flex: 1 }}>
            <Button style={{ float: 'right' }} type="primary" onClick={selectVar}>
              选择变量
            </Button>
          </div>
        </div>
      </Form>
      <VarCardList cref={varRef} selectVar={selectVar} />
      <SubBox />
    </div>
  );
};

export default MissingValueFilling;
