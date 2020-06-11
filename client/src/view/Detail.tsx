import React, { useContext, useState, useEffect } from 'react';
import {  Link, useHistory, useLocation } from 'react-router-dom';
import './Details.scss';
import { Row, Col, Input, Menu, Dropdown, Button, Drawer } from 'antd';
import { DownOutlined, SearchOutlined } from '@ant-design/icons';
import { ClickParam } from 'antd/lib/menu';
import { classnames } from '../utils/classnames';
import { ViewportContext } from '../App';
import { StoreHeaderDesktop } from '../components/StoreHeaderDesktop';
import { StoreHeaderMobile } from '../components/mobile/StoreHeaderMobile';
import { getGameById } from '../api/api';
import { Game } from '../api/db-types';
import { imgUrl } from '../config/envconfig';

interface Item {
  pathname: string;
  name: string;
}

export const Detail:React.FC<{}> = () => {
  const viewport  = useContext(ViewportContext);
  const { pathname } = useLocation();
  let history = useHistory();
  const [ game, setGame ] = useState<Game>();
  useEffect( () => {
    const getGame = async () => {
      const { data } = await getGameById(pathname.replace('/detail/', ''));
      setGame(data.data.game);
console.log(data.data)
    }
    getGame();
  }, [pathname]);

  const navItems:Item[] = [{
    pathname,
    name: ''
  }]
  if(game) {
    navItems[0].name = (game as Game).name;
  } 
  return (
    <div className="details">
      {navItems[0].name && ((viewport === 'desktop')  
      ? <StoreHeaderDesktop items={navItems} toback /> 
      : <StoreHeaderMobile items={navItems} toback />)}
    </div>    
  )
}