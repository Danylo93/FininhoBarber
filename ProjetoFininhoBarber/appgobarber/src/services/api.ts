import axios from 'axios';

const api = axios.create({
   baseURL: 'http://192.168.0.4:3333',
  //baseURL: process.env.REACT_APP_API_URL,
});

export default api;
