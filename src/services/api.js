import axios from 'axios';

const client = axios.create({
    baseURL: "http://localhost:9082"
  });
  
  export default client;
