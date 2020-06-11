import React, { useState, useEffect } from 'react';
import {  Link, useHistory, useLocation } from 'react-router-dom';
import './StoreHeaderMobile.scss';
import { Row, Col, Input, Menu, Dropdown, Button, Drawer } from 'antd';
import { DownOutlined, SearchOutlined } from '@ant-design/icons';
import { ClickParam } from 'antd/lib/menu';

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

export const StoreHeaderMobile:React.FC<Props> = (props) => {
  const { defaultValue, onSearch, items, toback } = props;
  const location = useLocation();
  let history = useHistory();

  //Navigation Menu
  const [ select, setSelect ] = useState('');

  useEffect(() => {
    const getCurrentSelect = (_pathname:string) => {
      if(_pathname === '') {
        return setSelect('探索');
      }
      const selectVal = items.find(({pathname})=> (pathname === _pathname));
      selectVal && setSelect(selectVal.name);
    }

    const _pathname = location.pathname.replace('/', '');

    getCurrentSelect(_pathname);
  }, [location.pathname, items]);

  const menu:JSX.Element = (
    <Menu className="header-menu">
      {items.length>0 && items.map(({ pathname, name }) => (
        <Menu.Item key={pathname || 'discover'}>
          <Link to={`/${pathname}`}> 
            <h2 className="header-menu-item">{name}</h2>
          </Link>
        </Menu.Item>
      ))}
      {toback && 
        <Link to='/'> 
          <h2 className="header-menu-item toback">返回商城</h2>
        </Link>
      }
    </Menu>
  )

  //Search Drawer
  const defaultSearch = (val:string):void => {
    if(!val) return;
    history.push('/browse', {query: val});
  }

  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  }

  return (
    <div className="store-header">
      <Row className="header-wrap">
        <Col span={20} offset={2} className="header-label-wrap">
          <Dropdown overlay={menu}>
            <h2 className="header-label"> 
              <span>{select} </span>
              <DownOutlined />
            </h2>
          </Dropdown>        
        </Col>
        
        <Col span={2} >
          <Button shape="circle"
           icon={<SearchOutlined />}
           onClick={() => showDrawer()} />
        </Col>
        <Drawer
          className="header-search-drawer"
          placement="top"
          onClose={() => setVisible(false)}
          visible={visible}
          getContainer={false}
        >
          <Search
            className="header-search"
            placeholder="search"
            defaultValue={defaultValue}
            allowClear={true}
            onSearch={onSearch
              ? (val) => onSearch(val)
              : (val) => defaultSearch(val)}
          />
        </Drawer>  
      </Row>
    </div>    
  )
}