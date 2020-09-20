import React, { useState, useEffect } from 'react';
import {  Link, useHistory, useLocation } from 'react-router-dom';
import './StoreHeaderMobile.scss';
import { Input, Menu, Dropdown, Button, Drawer } from 'antd';
import { DownOutlined, UpOutlined, SearchOutlined } from '@ant-design/icons';

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
  const { pathname: path } = useLocation();
  let history = useHistory();

  //Navigation Menu
  const [ selected, setSelected ] = useState('');

  useEffect(() => {
    const getCurrentSelect = (path:string) => {
      const selectVal = items.find(({pathname})=> (pathname === path));
      selectVal && setSelected(selectVal.name);
    }
    
    getCurrentSelect(path);
  }, [path, items]);

  const menu:JSX.Element = (
    <Menu className="header-menu">
      {items.length>0 && items.map(({ pathname, name }) => (
        <Menu.Item key={pathname.replace('/', '') || 'discover'}>
          <Link to={pathname}> 
            <h2 className="header-menu-item">{name}</h2>
          </Link>
        </Menu.Item>
      ))}
      {toback && 
        <Menu.Item key={'discover'}>
          <Link to='/'> 
            <h2 className="header-menu-item toback">返回商城</h2>
          </Link>
        </Menu.Item>
      }
    </Menu>
  )

  const [showMenu, setShowMenu] = useState(false);

  //Search Drawer
  const defaultSearch = (val:string) => {
    if(!val) return;
    history.push('/browse', {query: val});
  }

  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  }

  return (
    <nav className="store-header-m">
      <div className="header-label-wrap">
        <Dropdown 
         overlay={menu}
         trigger={['click']}
         onVisibleChange={(visible) => {
           console.log(visible);
          setShowMenu(visible)
         }}>
          <h2 className="header-label"> 
            <span>{selected} </span>
            {showMenu? <UpOutlined />: <DownOutlined />}
          </h2>
        </Dropdown>        
      </div >
      
      <div className="header-search-icon">
        <Button shape="circle"
          icon={<SearchOutlined />}
          onClick={() => showDrawer()} />
      </div>
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
    </nav>    
  )
}