import axios from 'axios'
import { baseUrl} from '../config/envconfig'

export const Service = axios.create({
  timeout: 5000, 
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
      username: 'wo945555',
      password: '949494ma'
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