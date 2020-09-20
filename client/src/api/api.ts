import { AxiosRequestConfig } from 'axios'
import { Service } from './service'
import { homePageTimeOut } from '../config/envconfig'
import { Game } from './db-types'
import { unique } from '../utils/unique'
import { CheckboxValueType } from '../components/CategoriesFilter';

export type Data = string | object | ArrayBuffer | ArrayBufferView | URLSearchParams
 | FormData | File | Blob;
export type Params = object | URLSearchParams;

export async function getGames() {
  const config:AxiosRequestConfig = {
    url: '/graphql',
    method: 'post',
    data: {
      query: `query {
        games {${gamePartfields}}
      }`
    },
    timeout: homePageTimeOut
  }
  return Service(config);
}

export async function getGamesByName(name:string) {
  const config:AxiosRequestConfig = {
    url: '/graphql',
    method: 'post',
    data: {
      query: `query {
        games(where: {name_contains: "${name}"}) {
          ${gamePartfields}
        }
      }`
    }
  }
  return Service(config);
}

const gamePartfields = `
  _id
  name
  developer
  price
  discount_price
  image {
    url
  }
`

export async function getGameById(id:string) {
  const config:AxiosRequestConfig = {
    url: '/graphql',
    method: 'post',
    data: {
      query: `query {
        game(id: "${id}") {${gameSubfields}}   
      }`
    }
  }
  return Service(config);
}

const gameSubfields = `
  _id
  name
  discription
  image {
    url
  }
  carousel_figure{
    url
  }
  specifications {
    platform
    minimum_os
    minimum_cpu
    minimum_gpu
    minimum_memory
    minimum_storage
    recommended_os
    recommended_cpu
    recommended_gpu
    recommended_memory
    recommended_storage
    languages_supported
  }
  developer
  release_date
  publisher
  critics_recommend
  top_critic_average_strong
  open_critic_rating
  price
  discount_price
  categories {
    key
  }
  tags {
    name
    key
  }
  game_rating
  about_content
`

export async function getCategories() {
  const config:AxiosRequestConfig = {
    url: '/graphql',
    method: 'post',
    data: {
      query: `query {
        categories{
          _id
          name
          key 
        }
      }`
    },
    timeout: homePageTimeOut
  }
  return Service(config);
}

export async function getGamesByCategories(keys:CheckboxValueType[]) {
  interface GamesByCategories {
    games: Game[];
  }

  let keysToString = '[';
  keysToString = keys.reduce((item:string, next:CheckboxValueType) => {
   return item + `"${next}"`;
  }, keysToString) + ']';

  const config:AxiosRequestConfig = {
    url: '/graphql',
    method: 'post',
    data: {
      query: `query {
        categories(where: {key_in: ${keysToString}}) {
          games {${gamePartfields}}
        }
      }`
    },
    transformResponse: [ //控制台Network的Response仍是原来的response data
      (data) => {
        if (typeof data === 'string') {
          try {
              data = JSON.parse(data);
          } catch (e) {
            console.error(e);
          }
      }
        return data;
      },
      (data) => {
        if(!data.data.categories) return data;

        const { categories } = data.data;
        let gamesArr:Game[] = []; 
        if(categories.length > 0) {
          (categories as GamesByCategories[]).forEach(({ games }) => {           
            games && (gamesArr = gamesArr.concat(games));
          });
        }
        gamesArr = unique(gamesArr, '_id');
        data.data = {games: gamesArr};
        return data;
      }],
  }
  return Service(config);
}