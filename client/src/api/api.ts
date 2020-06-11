import { Service } from './service'

export type Data = string | object | ArrayBuffer | ArrayBufferView | URLSearchParams
 | FormData | File | Blob;
export type Params = object | URLSearchParams;

export interface Config {
  url: string;
  method: 'get' | 'post';
  data?: Data;
  params?: Params;
}

export async function getGames() {
  const config:Config = {
    url: '/graphql',
    method: 'post',
    data: {
      query: `query {
        games {
          _id
          name
          discription
          image {
            url
          }
        }
      }`
    }
  }
  return Service(config);
}

export async function getGamesByName(name:string) {
  const config:Config = {
    url: '/graphql',
    method: 'post',
    data: {
      query: `query {
        games(where: {name_contains: "${name}"}) {
          _id
          name
          discription
          image {
            url
          }
        }
      }`
    }
  }
  return Service(config);
}

export async function getGameById(id:string) {
  const config:Config = {
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
  specification {
    platform
    minimum_os
    minimum_cpu
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
    name
    key
  }
  tags {
    name
    key
  }
`