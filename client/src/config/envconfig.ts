import { TIME_OUT } from './constant'
let baseUrl:string,
    imgUrl:string,
    homePageTimeOut:number;

if (process.env.NODE_ENV === 'development'){
  baseUrl = 'http://localhost:1337/';
  imgUrl = 'http://localhost:1337';
  homePageTimeOut = 90000; //避免服务端没有启动起来时，客户端已经渲染完成
} else if (process.env.NODE_ENV === 'production') {
  baseUrl = 'http://localhost:1337/';
  imgUrl = 'http://localhost:1337';
  homePageTimeOut = TIME_OUT;
}

export  {
  baseUrl,
  imgUrl,
  homePageTimeOut
}