import React from 'react';
import {  Link, NavLink, useHistory } from 'react-router-dom';
import './StoreHeaderDesktop.scss';
import { Row, Col, Input } from 'antd';
import { LeftOutlined } from '@ant-design/icons';

const { Search } = Input;

interface Item {
  pathname: string;
  name: string;
}
interface Props {
  defaultValue?: string;
  onSearch?: (val:string) => void;
  items: Item[];
  toback?: boolean;
}


export const StoreHeaderDesktop:React.FC<Props> = (props) => {
  const { defaultValue, onSearch, items, toback } = props; 
  let history = useHistory();

  const defaultSearch = (val:string):void => {
    if(!val) return;
    history.push('/browse', {query: val});
  }

  return (
    <Row className="store-header">
      {toback && <Col span={2}>
        <Link to='/' className="store-header-nav">
          <h2>
            <LeftOutlined /> 返回商城
          </h2>
        </Link>     
      </Col>}
      {items.length>0 && items.map(({ pathname, name }) => (
        <Col span={4} key={pathname || 'discover'}>
          <NavLink to={`/${pathname}`}
           className="store-header-nav"
           activeClassName="header-nav-selected"
           exact>
            <h2>{name}</h2>
          </NavLink>
        </Col>
      ))}
      <Col span={3} offset={(18 - items.length*4)} >
        <Search
          className="store-header-search"
          placeholder="search"
          defaultValue={defaultValue}
          allowClear={true}
          onSearch={onSearch
            ? (val) => onSearch(val)
            : (val) => defaultSearch(val)}
        />
      </Col>          
    </Row>
  )
}