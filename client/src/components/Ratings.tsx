import React, { useContext } from 'react';
import './Ratings.scss';
import { Progress } from 'antd';
import { Game } from '../api/db-types';
import { openCriticRatingDetail } from '../config/constant'
import { ViewportContext } from '../App';

interface Props {
  game: Game;
}

export const Ratings:React.FC<Props> = (props) => {
  const { game } = props;
  const { critics_recommend, top_critic_average_strong, open_critic_rating } = game;

  const viewport  = useContext(ViewportContext);
  const progressWith = (viewport === 'desktop')? 100: 75;
  return(
    <div className="ratings">
      { critics_recommend && <div className="ratings-item">
        <Progress type="circle"
         className="ratings-item-progress"
         percent={critics_recommend}
         width={progressWith} />
        <div className="ratings-item-title">
          <span>评论家推荐</span>
        </div>
      </div> }
      { top_critic_average_strong && <div className="ratings-item">
        <Progress type="circle"
         className="ratings-item-progress"
         percent={top_critic_average_strong}
         width={progressWith}
         format={(top_critic_average_strong) => top_critic_average_strong} />
        <div className="ratings-item-title">
          <span>顶级评论家平均分</span>
        </div>
      </div> }
      { open_critic_rating && <div className="ratings-item">
        <Progress type="circle"
         className="ratings-item-progress"
         percent={openCriticRatingDetail[open_critic_rating].percent}
         width={progressWith}
         format={() => openCriticRatingDetail[open_critic_rating].name} />
        <div className="ratings-item-title">
          <span>OpenCritic评级</span>
        </div>
      </div> }
    </div>
  )
}