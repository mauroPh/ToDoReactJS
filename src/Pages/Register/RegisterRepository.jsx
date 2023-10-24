import axios from 'axios';
import {api} from '../Login/LoginRepository';

// const api = axios.create({
//   baseURL: 'http://localhost:8080/api',
// });


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

async function createUser(email, password, description) {
  try {
    const response = await api.post('/user/create', {
      email: email,
      password: password,
      description: description
    }, { withCredentials: true });
    console.log("createUser ", response.data);
    localStorage.setItem('token', response.data.result.token);
    localStorage.setItem('email', response.data.result.username);
    return response.data.result.token;
  } catch (error) {
    console.error(error);
  }
}

export { createUser };

