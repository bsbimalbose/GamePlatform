import userApi from './userApi.js';

const api = (server) => {
  server.use('/api/v1/user', userApi);
};

export default api;
