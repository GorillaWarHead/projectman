import HTTP from '../../plugins/http';
import { notification } from 'ant-design-vue';

export default {
  namespaced: true,

  state: {
    validities: [],
    meta: {
      current: 1,
      itemsPerPage: 10,
      totalItems: 0,
    },

    selectedValidity: {},
    drawer: false,
  },
  getters: {},
  mutations: {
    setValidities(state, payload) {
      state.validities = payload;
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
    setDrawer(state, payload) {
      state.drawer = payload;
    },
    setSelectedValidity(state, payload) {
      state.selectedValidity = payload;
    },
  },
  actions: {
    fetchValidities({ commit, state }) {
      return HTTP()
        .get(`/validities`, {
          params: {
            page: state.meta.current - 1,
            size: state.meta.itemsPerPage,
          },
        })
        .then(({ data }) => {
          commit('setValidities', [...data.validities]);
          commit('setTotalItems', data.totalItems);
        });
    },
    deleteValidity({ dispatch }, payload) {
      return HTTP()
        .delete(`/validities`, { params: { validityId: payload } })
        .then(() => {
          dispatch('fetchValidities');
          notification.success({
            message: 'Validity deleted successfully',
          });
        })
        .catch(() => {
          notification.error({
            message: 'Error deleting Validity',
          });
        });
    },
  },
};
