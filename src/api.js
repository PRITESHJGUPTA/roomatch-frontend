import axios from 'axios';

const API = axios.create({
  baseURL: 'https://roomatch-backend.onrender.com',
});

export default API;
