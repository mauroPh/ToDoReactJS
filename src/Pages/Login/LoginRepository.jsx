import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
});

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

async function getToken(email, password) {
  try {
    const response = await api.post('/token/generate-token', {
      email: email,
      password: password
    });
    console.log("getToken ", response.data);
    localStorage.setItem('token', response.data.result.token);
    return response.data.result.token;
  } catch (error) {
    console.error(error);
  }
}

export {
  api, getToken
};
