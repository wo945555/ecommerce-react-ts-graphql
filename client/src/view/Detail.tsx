import React, { useContext, useState, useEffect, useRef, Fragment } from 'react';
import {  useHistory, useLocation } from 'react-router-dom';
import './Details.scss';
import { classnames } from '../utils/classnames';
import { ViewportContext } from '../App';
import { StoreHeaderDesktop } from '../components/StoreHeaderDesktop';
import { StoreHeaderMobile } from '../components/mobile/StoreHeaderMobile';
import { GameMetaCard } from '../components/GameMetaCard';
import { Ratings } from '../components/Ratings';
import { SpecificationCard } from '../components/SpecificationCard';
import { getGameById } from '../api/api';
import { Game, Specification } from '../api/db-types';

interface Item {
  pathname: string;
  name: string;
}
interface DetailItem {
  key: string;
  header: string;
  children: JSX.Element | undefined;
}

export const Detail:React.FC<{}> = () => {
  const viewport  = useContext(ViewportContext);
  const { pathname } = useLocation();
  const [ game, setGame ] = useState<Game>();
  useEffect(() => {
    const getGame = async () => {
      const { data } = await getGameById(pathname.replace('/detail/', ''));
      setGame(data.data.game);
    }
    getGame();
  }, [pathname]);

  // 导航列表
  const navItems:Item[] = [{
    pathname,
    name: game? (game as Game).name: '',
  }];

  // 详情列表
  const detailItems:DetailItem[] = [{
    key: 'about_game',
    header: '关于游戏',
    children: <GameMetaCard game={(game as Game)} />
  },{
    key: 'ratings',
    header: '评级',
    children: <Ratings game={(game as Game)} />
  }, {
    key: 'specifications',
    header: '配置',
    children: <Fragment>
      { game
       ? <SpecificationCard specifications={(game.specifications as Specification[])} />
       : <div></div> }
    </Fragment>
  }];

  // group-header随滚动粘黏
  const articleRefs: React.MutableRefObject<HTMLElement[]> = useRef([]);
  const [ stickyIndex, setStickyIndex ] = useState<number>(0);
  useEffect(() => {
    articleRefs.current = articleRefs.current.slice(0,detailItems.length);  
  }, [detailItems]);
  // 滚动前顶部到视窗高度
  const [ initTop, setInitTop ] = useState<number>(0); 
  useEffect(() => {
    if(articleRefs.current[0]) {
      window.scrollTo(0, 0);
      const { top } = articleRefs.current[0].getBoundingClientRect();
      setInitTop(top);
    }
  }, [articleRefs.current[0]])

  const handleScroll = (e:Event) => {
    let ticking:boolean = false;
    if(!ticking) {
      window.requestAnimationFrame(() => {
        const els = articleRefs.current;
        if(els.length > 0){
          const index = els.findIndex((el) => isCurrentSection(el));
          els.forEach((el) => isCurrentSection(el));
          setStickyIndex(index);
        }
        
        ticking = false;
      })
    }
    ticking = true;
  }
  const isCurrentSection = (el: Element) => {
    const { top, bottom } = el.getBoundingClientRect();
    return (top - initTop <= 0) && ((bottom - 80) - initTop >= 0);
  }

  useEffect(() => {
    (viewport === 'desktop') && window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [viewport, initTop])
  return (
    <div id="details">
      { navItems[0].name && ((viewport === 'desktop')  
      ? <StoreHeaderDesktop items={navItems} toback /> 
      : <StoreHeaderMobile items={navItems} toback />) }

      { game && <section className="groups">
        { detailItems.map(({key, header, children}, index) =>
         <article className={classnames(
            'group-wrapper',
            {'group-sticky': (viewport === 'desktop') && (stickyIndex === index)})}
           key={key}
           ref={el => articleRefs.current[index] = (el as HTMLElement)}>
            <div className="group-left">
              <div className="group-header">
                <span>{header}</span>
              </div>
            </div>
            <div className="group-content">
              { children }
            </div>
          </article>
          )
        }
        
      </section> }
    </div>
  )
}