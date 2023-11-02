import api from '../../services/api';

export async function getUserInfo(email, password) {
  try {
    const response = await api.post('/token/generate-token', {
      email,
      password,
    });

    if (response.data && response.data.result) {
      const { token, username } = response.data.result;
      console.log('response login : ',response.data.result );
      localStorage.setItem('userId', response.data.result.userId);
      localStorage.setItem('profileId', response.data.result.profile.profileId);
      localStorage.setItem('token', token);
      localStorage.setItem('email', response.data.result.email);
      return { email: username, token };
    }
  } catch (error) {
    console.error('Error fetching user info:', error);
  }

  return null;
}

export async function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('email');
}

