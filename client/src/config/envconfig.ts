let baseUrl:string,
    imgUrl:string;

if (process.env.NODE_ENV === 'development'){
  baseUrl = 'http://localhost:1337/';
  imgUrl = 'http://localhost:1337';
} else if (process.env.NODE_ENV === 'production') {
  baseUrl = 'http://localhost:1337/'
  imgUrl = 'http://localhost:1337';
}

export  {
  baseUrl,
  imgUrl
}