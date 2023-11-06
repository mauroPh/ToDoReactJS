import api from '../../services/api';
import { login } from "../../services/auth";

async function getUserInfo(email, password) {
  try {
    let response = await api.post('/token/generate-token', {
      email: email,
      password: password
    });
    
    console.log("getUserInfo = ", response.data);

    if (response.data.result.token === undefined || localStorage.getItem('token') === undefined) {
      alert("Usuário ou senha inválidos");
    } else {
        await login(response.data.result.token, response.data.result.profile.profileId, response.data.result.email);
        return response.data.result.token;
    }
  } catch (error) {
    console.error(error);
  }
  return false;
}

export {
  getUserInfo
};

