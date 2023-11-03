export const isAuthenticated = () => localStorage.getItem('token') !== null;
export const getToken = () => localStorage.getItem('token');
export const login = token => {
  localStorage.setItem('token', token);
};
export const logout = () => {
  localStorage.removeItem('token');
  try {
    localStorage.removeItem('email');
    localStorage.removeItem('profile');
  } catch (err) {
    console.error(err);
  }
};
export const getProfileId = () => localStorage.getItem('profile');
