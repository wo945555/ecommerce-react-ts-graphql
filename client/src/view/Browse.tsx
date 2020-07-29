import React, { useContext, useState, useEffect } from 'react';
import {  useLocation, useHistory } from 'react-router-dom';
import './Browse.scss';
import { Card, Spin } from 'antd';
import { ViewportContext } from '../App';
import { StoreHeaderDesktop } from '../components/StoreHeaderDesktop';
import { StoreHeaderMobile } from '../components/mobile/StoreHeaderMobile';
import { getGames, getGamesByName } from '../api/api';
import { Game } from '../api/db-types';
import { imgUrl } from '../config/envconfig';


const { Meta } = Card;

export const Browse:React.FC<{}> = () => {
  const viewport  = useContext(ViewportContext);
  const location = useLocation();
  const { state } = location;
  let history = useHistory();
  const [ games, setGames ] = useState<Game[]|[]>([]);
  const [ loadingGames, setLoadingGames ] = useState<boolean>(false);

  const navItems = [{
    pathname:'/',
    name:'探索'
  },{
    pathname:'/browse',
    name:'浏览'
  }]

  const  handleSearch = async (val:string)  => {
    if(!val) return;
    setLoadingGames(true);
    try {
      const { data } = await getGamesByName(val);
      setGames(data.data.games)
      setLoadingGames(false);
    }catch {
      setLoadingGames(false);
    }
  }

  const handleCardClick = (
   e:React.MouseEvent<HTMLDivElement, MouseEvent>,
   id:React.ReactText) => {
    history.push(`/detail/${id}`);
  }

 useEffect( () => {
    const getAllGames = async () => {
      const { data } = await getGames();
      setGames(data.data.games)
      setLoadingGames(false);  
    }
    
    if(state) {
      const query = (state as any).query;
      handleSearch(query);
    }else {
      getAllGames();
    }
  }, [state]);

  return(
    <div className="browse">
      {(viewport === 'desktop')  
      ? <StoreHeaderDesktop onSearch={(val)=>handleSearch(val)} items={navItems} /> 
      : <StoreHeaderMobile onSearch={(val)=>handleSearch(val)} items={navItems} />}
      
      <Spin delay={500} size="large" spinning={loadingGames}>
        <section className="browse-content browse-card-wrap">
          { (games).length >0 && (games as Game[]).map(game => (
            <Card
            key={game._id}
            className="browse-card"
            hoverable
            cover={<img alt={game.name} src={`${imgUrl}${game.image.url}`} />}
            onClick={(e) => handleCardClick(e, game._id)}
            >
              <Meta title={game.name} description={game.discription} />
            </Card>
          )) }
        </section>
      </Spin>
    </div>
  )
}