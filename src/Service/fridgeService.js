const baseApi = 'http://localhost:8080';
const initialSettings = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const requestApi = (route, settings) => {
  return fetch([baseApi, route].join('/'), {...initialSettings, ...settings});
};

const getGoods = async (id = '') => {

};
