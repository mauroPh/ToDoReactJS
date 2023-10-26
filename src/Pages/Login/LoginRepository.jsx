import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers['Content-Type'] = 'application/json';
      config.headers['Access-Control-Allow-Origin'] = 'http://localhost:8080';
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

async function getUserInfo(email, password, profileId) {
  try {
    const response = await api.post('/token/generate-token', {
      email: email,
      password: password,
      profileId: profileId,
    });
    console.log("getUserInfo ", response.data);
    localStorage.setItem('token', response.data.result.token);
    localStorage.setItem('email', response.data.result.username);
    return response.data.result.token;
  } catch (error) {
    console.error(error);
  }
}



export {
  api, getUserInfo
};
