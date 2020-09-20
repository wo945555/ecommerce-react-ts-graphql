import React, { useReducer } from 'react';
import './CategoriesFilter.scss';
import { Button, List, Divider } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { Category } from '../api/db-types';
import { classnames } from '../utils/classnames';
import { useDidUpdateEffect } from '../utils/customHooks/useDidUpdateEffect'

export type CheckboxValueType = string | number;
export type CheckboxValuesType = CheckboxValueType[];

interface Props {
  categories: Category[];
  initialValues?: CheckboxValuesType | [];
  onChange: (values:CheckboxValuesType | [])=>void;
}
interface State {
  values: CheckboxValuesType | [];
}
interface CheckedAction {
  type: string;
  val: CheckboxValueType | CheckboxValuesType | [];
}

const init = (initialValues:CheckboxValuesType | []):State => {
  return {values: initialValues};
}
const checkedReducer = (state:State, action:CheckedAction) => {
  const { values } = state;
  const { type, val } = action;
  switch(type) {
    case 'CANCEL_VALUE':
      return { values: values.filter(v => v !== (val as CheckboxValueType)) };
    case 'ADD_VALUE':
      return { values: [...values, (val as CheckboxValueType)] };
    case 'RESET':
      return init(val as CheckboxValuesType | []);
    default:
      throw new Error();
  }
}

export const CategoriesFilter:React.FC<Props> = ({categories, initialValues=[], onChange}) => {
  const [ state, dispatch ] = useReducer(checkedReducer, initialValues, init);

  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    switch(checked) {
      case false:
        dispatch({type:'CANCEL_VALUE', val: value});
        break;
      case true:
        dispatch({type:'ADD_VALUE', val: value});
        break;
    }  
  }

  const handleReset = () => {
    dispatch({type:'RESET', val: initialValues});
  }

  useDidUpdateEffect(() => {
    onChange(state.values);
  }, [state.values])

  //选中时显示图标
  const checked = (val:string) => {
    return state.values.length>0 && (state.values as CheckboxValuesType).indexOf(val) !== -1
  }


  const listItem = (item:Category): JSX.Element => {
    return (
      <List.Item>
        <label className="filter-checkbox" >
          {item.name} 
          <CheckOutlined className={classnames('checkicon', {hide: !checked(item.key)})} />
          <input type="checkbox"
           className="no-display"
           name="category"
           value={item.key}
           checked={checked(item.key)}
           onChange={(e)=>handleInputChange(e)} />
        </label>       
      </List.Item>)
  }
  return(
    <div className="categories-filter">
      <div className="filter-header">
        <h2>筛选器</h2>
        <Button type="text" onClick={()=>handleReset()}>重置</Button>
      </div>
      <Divider orientation="left">分类</Divider>
      <List
        size="large"
        bordered
        dataSource={categories}
          renderItem={item => listItem(item)}
      />
    </div>
  )
}