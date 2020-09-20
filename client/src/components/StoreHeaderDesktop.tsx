import React from 'react';
import {  Link, NavLink, useHistory } from 'react-router-dom';
import './StoreHeaderDesktop.scss';
import { Input } from 'antd';
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



  const defaultSearch = (val:string) => {
    if(!val) return;
    history.push('/browse', {query: val});
  }

  return (
    <nav className="store-header">
      <ul className="store-header-nav">
        {toback && <li className="nav-item">
          <Link to='/'>
            <h2>
              <LeftOutlined /> 返回商城
            </h2>
          </Link>     
        </li>}
        {items.length>0 && items.map(({ pathname, name }) => (
          <li className="nav-item" key={pathname.replace('/', '') || 'discover'}>
            <NavLink to={`${pathname}`}
            activeClassName="header-nav-selected"
            exact>
              <h2>{name}</h2>
            </NavLink>
          </li>
        ))}
      </ul>
      
      <div className="store-header-search">
        <Search
          placeholder="search"
          defaultValue={defaultValue}
          allowClear={true}
          onSearch={onSearch
            ? (val) => onSearch(val)
            : (val) => defaultSearch(val)}
        />
      </div>          
    </nav>
  )
}