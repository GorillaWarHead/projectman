import axios from 'axios';

export default () => {
  return axios.create({
    baseURL:
      process.env.VUE_APP_BASE_URL || 'http://173.212.244.163:8080/AzuRODM/api',
    // headers: {
    //   'Access-Control-Allow-Origin': '*',
    //   'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    //   //   Authorization: `Bearer ${store.state.account.token}`,
    // },
  });
};
