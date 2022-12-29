import { Button, Divider, Form, Input, message, Select, Slider, Space, Table } from 'antd';
import { twoDecimal_f } from '../utils/util';
import SubBox from './components/subBox';
import VarCardList from './components/varCardList';
import { VarBoxList } from './config';
import style from './style.less';

const MissingValueFilling: React.FC<any> = (props: any) => {
  const [form] = Form.useForm();
  const { Item: FormItem, List: FormList } = Form;

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

  const onChange = (e: any) => {
    let val = e.target.value;
    let arr: any = val.split('~');
    let formData: any = form.getFieldsValue();
    if (arr.length == 2 && arr[0] && arr[1]) {
      console.log(arr);
      if (Number(arr[0]) != NaN && Number(arr[1] != NaN)) {
        arr[0] = Number(arr[0]);
        arr[1] = Number(arr[1]);
        if (arr[0] > arr[1]) {
          arr = arr.reverse();
        }
        if (arr[1] > 10 || arr[0] < 0) {
          message.warning('请保证范围在0-1');
          console.log(formData);
          formData.ivStr = formData?.iv?.map((item: any) => twoDecimal_f(item))?.join('~');
          form.setFieldsValue({ ...formData });
          return;
        }
        formData.iv = arr;
        formData.ivStr = arr?.map((item: any) => twoDecimal_f(item))?.join('~');
        form.setFieldsValue({ ...formData });
      }
    } else {
      formData.ivStr = formData?.iv?.map((item: any) => twoDecimal_f(item))?.join('~');
      form.setFieldsValue({ ...formData });
    }
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
                    onBlur={onChange}
                  ></Input>
                </FormItem>
              </div>
            );
          })}
        </div>
      </Form>
      <VarCardList />
      <SubBox />
    </div>
  );
};

export default MissingValueFilling;
