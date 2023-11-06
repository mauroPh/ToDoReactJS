import api from '../../services/api';

async function getUserInfo(email, password) {
  try {
    const response = await api.post('/token/generate-token', {
      email: email,
      password: password
    });
    
    const profileId = response.data.result.profileId; 
    
    localStorage.setItem('token', response.data.result.token);
    localStorage.setItem('email', response.data.result.username);
    localStorage.setItem('profileId', profileId); 

    return response.data.result.token;
  } catch (error) {
    console.error(error);
  }
}

export {
  getUserInfo
};


