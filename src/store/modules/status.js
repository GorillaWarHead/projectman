import HTTP from '../../plugins/http';
import { notification } from 'ant-design-vue';

export default {
  namespaced: true,

  state: {
    statusList: [],
    status: [],
    selectedStatus: {},
    drawer: false,
    meta: {
      current: 1,
      itemsPerPage: 10,
      totalItems: 0,
    },
  },
  getters: {},
  mutations: {
    setStatusList(state, payload) {
      state.statusList = payload;
    },
    setStatus(state, payload) {
      state.status = payload;
    },
    setSelectedStatus(state, payload) {
      state.selectedStatus = payload;
    },
    setDrawer(state, payload) {
      state.drawer = payload;
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
    fetchStatusList({ commit }) {
      return HTTP()
        .get(`/status/list`)
        .then(({ data }) => {
          commit('setStatusList', [...data]);
        });
    },
    fetchStatus({ commit }) {
      return HTTP()
        .get(`/status`)
        .then(({ data }) => {
          commit('setStatus', [...data.status]);
          commit('setTotalItems', data.totalItems);
        });
    },
    deleteStatus({ dispatch }, payload) {
      return HTTP()
        .delete(`/status`, { params: { statusId: payload } })
        .then(() => {
          dispatch('fetchStatus');
          notification.success({
            message: 'Status deleted successfully',
          });
        })
        .catch(() => {
          notification.error({
            message: 'Error deleting status',
          });
        });
    },
  },
};
