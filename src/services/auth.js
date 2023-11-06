export function login(token, profile, email) {
  try {
    localStorage.setItem('token', token);
    localStorage.setItem('email', email);
    localStorage.setItem('profile', profile);
  } catch (err) {
    console.error(err);
  }
};

export function logout() {
  localStorage.removeItem('token');
  try {
    localStorage.removeItem('email');
    localStorage.removeItem('profile');
  } catch (err) {
    console.error(err);
  }
};

export const isAuthenticated = () => {
  let _res = localStorage.getItem('token') !== null;
  console.log(_res);
  return _res;
};

export const getToken = () => localStorage.getItem('token');

export const getProfileId = () => localStorage.getItem('profile');
