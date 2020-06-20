import React, { useContext }from 'react';
import './GameMetaCard.scss';
import ReactMarkdown from 'react-markdown'
import { WindowsFilled, AppleFilled } from '@ant-design/icons';
import { ViewportContext } from '../App';
import { ShowMore } from '../components/common/ShowMore';
import { matchRatingUrl } from '../utils/urlMatchs';
import { Game, Specification, Platform } from '../api/db-types';


interface Props {
  game: Game;
}

export const GameMetaCard:React.FC<Props> = (props) => {
  const viewport  = useContext(ViewportContext);
  const { game } = props;
  const { developer, publisher, release_date, tags, game_rating, specifications, about_content } = game;
  const tagNames = tags.map( ({ name }) => name );
  const platforms: Platform[] = (specifications as Specification[]).map( ({ platform }) => platform );

  const getPlatformIcon = (platform:Platform):JSX.Element => {
    switch(platform){
      case 'windows':
        return <WindowsFilled />
      case 'macOS':
        return <AppleFilled />
    }
  }

  return(
    <div id="gameMeta">
      <div className="meta-items">
        <div className="meta-item"> 
          <span className="meta-label">开发商</span>
          <div className="meta-data">{developer}</div>
        </div>
        <div className="meta-item"> 
          <span className="meta-label">发行商</span>
          <div className="meta-data">{publisher}</div>
        </div>
        <div className="meta-item"> 
          <span className="meta-label">发行日期</span>
          <div className="meta-data">{release_date}</div>
        </div>
        <div className="meta-item"> 
          <span className="meta-label">标签</span>
          <div className="meta-data">
            { tagNames.map((tagName, i) => <span  key={i}>{tagName}</span>) }
          </div>
        </div>
        <div className="meta-item"> 
          <span className="meta-label">评级</span>
          <div className="meta-data">
             <img src={matchRatingUrl(game_rating)} height={(viewport === 'desktop')? 70: 50}></img>      
          </div>
        </div>
        <div className="meta-item"> 
          <span className="meta-label">平台</span>
          <div className="meta-data">
            { platforms.map(platform => <span key={platform}>
                {getPlatformIcon(platform)}
              </span>) }
          </div>
        </div>
      </div>
      <div className="about-content">
        { about_content && 
          <ShowMore>
            <ReactMarkdown source={about_content} />
          </ShowMore> }
      </div>
    </div>
  )
}