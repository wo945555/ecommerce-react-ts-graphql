import axios from 'axios'
import { baseUrl } from '../config/envconfig'
import { TIME_OUT } from '../config/constant'

export const Service = axios.create({
  timeout: TIME_OUT, 
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  validateStatus: (status:number)=> {
    return status >= 200 && status < 300
  },
  proxy: {
    host: '127.0.0.1',
    port: 1337,
    auth: {
      username: 'a1234',
      password: 'a12344321'
    }
  }
})

Service.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  return Promise.reject(error);
});

Service.interceptors.response.use(function (response) {
  if(response.data.errors){
    return Promise.reject(response.data.errors);
  }else {
    return response;
  }
}, function (error) {
  return Promise.reject(error);
});