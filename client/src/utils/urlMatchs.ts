import { GameRating } from '../api/db-types';
import { EVERYONE_IMG, MATURE_IMG, TEEN_IMG } from '../config/constant';

export const matchRatingUrl = (rating:GameRating) => {
  let ratingUrl = '';
  switch(rating){
    case 'everyone':
      ratingUrl = EVERYONE_IMG;
      break;
    case 'mature':
      ratingUrl = MATURE_IMG;
      break;
    case 'teen':
      ratingUrl = TEEN_IMG;
      break;
    default:
      ratingUrl = '';
  }
  return ratingUrl
}