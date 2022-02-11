import HTTP from '../../plugins/http';
// import { notification } from 'ant-design-vue';

export default {
  namespaced: true,

  state: {
    itValidities: [],
    meta: {
      current: 1,
      itemsPerPage: 10,
      totalItems: 0,
    },
  },
  getters: {},
  mutations: {
    setItValidities(state, payload) {
      state.itValidities = payload;
    },
    setCurrent(state, payload) {
      state.meta.current = payload;
    },
    setTotalItems(state, payload) {
      state.meta.totalItems = payload;
    },
    setItemsPerPage(state, payload) {
      state.meta.itemsPerPage = payload;
    },
  },
  actions: {
    fetchItValidities({ commit, state }) {
      return HTTP()
        .get(`/validities/it`, {
          params: {
            page: state.meta.current - 1,
            size: state.meta.itemsPerPage,
          },
        })
        .then(({ data }) => {
          commit('setItValidities', [...data.validities]);
          commit('setTotalItems', data.totalItems);
        });
    },
  },
};
