import userApi from './userApi.js';
import gameApi from './gameApi.js';
import scoreApi from './scoreApi.js';

const api = (server) => {
  server.use('/api/v1/user', userApi);
  server.use('/api/v1/game', gameApi);
  server.use('/api/v1/score', scoreApi);
};

export default api;
