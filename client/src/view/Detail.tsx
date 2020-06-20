import React, { useContext, useState, useEffect } from 'react';
import {  useHistory, useLocation } from 'react-router-dom';
import './Details.scss';
import { classnames } from '../utils/classnames';
import { ViewportContext } from '../App';
import { StoreHeaderDesktop } from '../components/StoreHeaderDesktop';
import { StoreHeaderMobile } from '../components/mobile/StoreHeaderMobile';
import { GameMetaCard } from '../components/GameMetaCard';
import { getGameById } from '../api/api';
import { Game } from '../api/db-types';

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
    <div id="details">
      { navItems[0].name && ((viewport === 'desktop')  
      ? <StoreHeaderDesktop items={navItems} toback /> 
      : <StoreHeaderMobile items={navItems} toback />) }

      <section className="groups">
        <article className="group-wrapper">
          <div className="group-left">
            <div className={classnames('group-header', 'group-sticky')}>
              <span>关于游戏</span>
            </div>
          </div>
          <div className="group-content">
            { game && <GameMetaCard game={game} /> }
          </div>
        </article>
      </section>
    </div>
  )
}