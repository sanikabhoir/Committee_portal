import api from './api';

const register = (username, email, password) => {
  return api.post('/auth/register', {
    username,
    email,
    password,
  });
};

const login = (username, password) => {
  return api.post('/auth/login', {
    username,
    password,
  })
  .then((response) => {
    if (response.data.accessToken) {
      localStorage.setItem('token', response.data.accessToken);
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  });
};

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export { register, login, logout };
