import api from './api';

const getAll = () => {
  return api.get('/committees');
};

const get = (id) => {
  return api.get(`/committees/${id}`);
};

const create = (data) => {
  return api.post('/committees', data);
};

const update = (id, data) => {
  return api.put(`/committees/${id}`, data);
};

const remove = (id) => {
  return api.delete(`/committees/${id}`);
};

export { getAll, get, create, update, remove };