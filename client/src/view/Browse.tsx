import React, { useContext, useState, useEffect } from 'react';
import {  useLocation, useHistory } from 'react-router-dom';
import './Browse.scss';
import { Card, Spin } from 'antd';
import { ViewportContext } from '../App';
import { StoreHeaderDesktop } from '../components/StoreHeaderDesktop';
import { CategoriesFilter, CheckboxValuesType } from '../components/CategoriesFilter';
import { StoreHeaderMobile } from '../components/mobile/StoreHeaderMobile';
import { getGames, getGamesByName, getCategories, getGamesByCategories } from '../api/api';
import { Game, Category } from '../api/db-types';
import { imgUrl } from '../config/envconfig';

const { Meta } = Card;

export const Browse:React.FC<{}> = () => {
  const viewport  = useContext(ViewportContext);
  const location = useLocation();
  const { state } = location;
  let history = useHistory();
  const [ games, setGames ] = useState<Game[]|[]>([]);
  const [ categories, setCategories ] = useState<Category[]|[]>([]);
  const [ loadingGames, setLoadingGames ] = useState<boolean>(false);

  const navItems = [{
    pathname:'/',
    name:'探索'
  },{
    pathname:'/browse',
    name:'浏览'
  }]

  const handleSearch = async (val:string)  => {
    if(!val) return;
    setLoadingGames(true);
    try {
      const { data } = await getGamesByName(val);
      setGames(data.data.games);
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

  const getAllGames = async () => {
    const { data } = await getGames();
    setGames(data.data.games)
    setLoadingGames(false);  
  }
  useEffect( () => {
    if(state) {
      const query = (state as any).query;
      handleSearch(query);
    }else {
      getAllGames();
    }
  }, [state]);

  useEffect( ()=> {
    const getAllCategories = async () => {
      const { data } = await getCategories();
      setCategories(data.data.categories);
    }
    getAllCategories();
  }, []);

  const onFilterChange = (values:CheckboxValuesType | []) => {
    setLoadingGames(true);
    if(values){
      const _getGamesByCategories = async (values:CheckboxValuesType | []) => {
        const { data } = await getGamesByCategories(values);
        setGames(data.data.games);
        setLoadingGames(false); 
      }
      _getGamesByCategories(values);
    }else {
      getAllGames();
    }
    
  }
  return(
    <div id="browse">
      {(viewport === 'desktop')  
      ? <StoreHeaderDesktop onSearch={(val)=>handleSearch(val)} items={navItems} /> 
      : <StoreHeaderMobile onSearch={(val)=>handleSearch(val)} items={navItems} />}
      
      <section className="browse-content">
        <section className="browse-presentation">
          <Spin delay={500} size="large" spinning={loadingGames}>
            <section className="browse-card-wrap">
              { games.length > 0 && (games as Game[]).map(game => (
                <Card
                key={game._id}
                className="browse-card"
                hoverable
                cover={<img alt={game.name} src={`${imgUrl}${game.image.url}`} />}
                onClick={(e) => handleCardClick(e, game._id)}
                >
                  <Meta title={game.name} description={game.developer || '1'} />
                </Card>
              )) }    
            </section>
          </Spin>
        </section>
        <aside className="browse-filter">
          { categories.length > 0 &&
           <CategoriesFilter categories={categories} onChange={(values)=>onFilterChange(values)} />
          }        
        </aside>
      </section>
    </div>
  )
}