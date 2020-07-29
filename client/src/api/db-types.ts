export type DateTime = string;
export type ID = string | number;

export interface Game {
  _id: ID;
  name: string;
  discription: string;
  image: UploadFile; 
  carousel_figure: UploadFile[];
  specifications?: Specification[];
  developer?: string;
  release_date?: string;
  publisher?: string;
  critics_recommend?: number;
  top_critic_average_strong?: number;
  open_critic_rating?:  OpenCriticRating;
  price?: number;
  discount_price?: number;
  categories: Category[]
  tags: Tag[];
  game_rating:  GameRating;
  about_content: string;
}

export type UploadFile = {
  url: string;
  createdAt?: DateTime;
  updatedAt?: DateTime;
  name?: string;
  alternativeText?: string;
  caption?: string;
  width?: number;
  height?: number;
  formats?: JSON
  hash?: string;
  ext?: string
  mime?: string;
  size?: number;
  previewUrl?: string;
  provider?: string;
  provider_metadata?: JSON;
}

export type Specification = {
  platform: Platform;
  minimum_os?: string;
  minimum_cpu?: string;
  minimum_gpu?: string;
  minimum_memory?: string;
  minimum_storage?: string;
  recommended_os?: string;
  recommended_cpu?: string;
  recommended_gpu?: string;
  recommended_memory?: string;
  recommended_storage?: string;
  languages_supported?: string;
  games?: Game[];
}

export type Platform = 'windows' | 'macOS';

export type Tag = {
  _id?: ID;
  name: string;
  key: string;
  games?: Game[];
}

export type Category = {
  name: string;
  key: string;
  games?: Game[];
}

export type OpenCriticRating = 'weak' | 'fair' | 'strong' | 'mighty';
export type GameRating = 'everyone' | 'mature' | 'teen';