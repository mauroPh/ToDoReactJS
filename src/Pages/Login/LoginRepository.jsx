import api from '../../services/api';

async function getUserInfo(email, password) {
  try {
    const response = await api.post('/token/generate-token', {
      email: email,
      password: password
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
  getUserInfo
};

